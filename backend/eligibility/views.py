from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.utils import timezone
from decimal import Decimal
from .models import GovernmentProgram, EligibilityCheck, ApplicationStatus
from .serializers import (
    GovernmentProgramSerializer, 
    EligibilityCheckSerializer,
    EligibilityInputSerializer,
    ApplicationStatusSerializer
)

class GovernmentProgramListView(generics.ListAPIView):
    """List all active government programs"""
    queryset = GovernmentProgram.objects.filter(is_active=True)
    serializer_class = GovernmentProgramSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_eligibility(request):
    """Check user eligibility for government programs"""
    serializer = EligibilityInputSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    
    # Get all active programs
    programs = GovernmentProgram.objects.filter(is_active=True)
    eligible_programs = []
    total_benefits = Decimal('0.00')
    
    # Check eligibility for each program
    for program in programs:
        is_eligible = True
        
        # Age check
        if program.min_age and data['age'] < program.min_age:
            is_eligible = False
        if program.max_age and data['age'] > program.max_age:
            is_eligible = False
            
        # Income check
        if program.max_income and data['annual_income'] > program.max_income:
            is_eligible = False
            
        # Student enrollment check
        if program.requires_enrollment and not data['is_student']:
            is_eligible = False
            
        # Citizenship check
        if program.requires_citizenship and not data['is_citizen']:
            is_eligible = False
        
        if is_eligible:
            eligible_programs.append(program)
            if program.max_benefit_amount:
                total_benefits += program.max_benefit_amount
    
    # Create eligibility check record
    eligibility_check = EligibilityCheck.objects.create(
        user=request.user,
        age=data['age'],
        annual_income=data['annual_income'],
        is_student=data['is_student'],
        is_citizen=data['is_citizen'],
        household_size=data['household_size'],
        state=data['state'],
        total_potential_benefits=total_benefits
    )
    
    eligibility_check.eligible_programs.set(eligible_programs)
    
    # Serialize and return results
    result_serializer = EligibilityCheckSerializer(eligibility_check)
    
    return Response({
        'eligibility_check': result_serializer.data,
        'message': f'Found {len(eligible_programs)} eligible programs'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_eligibility_history(request):
    """Get user's eligibility check history"""
    checks = EligibilityCheck.objects.filter(user=request.user).order_by('-created_at')
    serializer = EligibilityCheckSerializer(checks, many=True)
    return Response(serializer.data)

class ApplicationStatusListCreateView(generics.ListCreateAPIView):
    """List and create application status records"""
    serializer_class = ApplicationStatusSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ApplicationStatus.objects.filter(user=self.request.user)

class ApplicationStatusDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete application status"""
    serializer_class = ApplicationStatusSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ApplicationStatus.objects.filter(user=self.request.user)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_program_statistics(request):
    """Get statistics about programs and applications"""
    total_programs = GovernmentProgram.objects.filter(is_active=True).count()
    total_checks = EligibilityCheck.objects.count()
    total_applications = ApplicationStatus.objects.count()
    
    # Program type distribution
    program_types = GovernmentProgram.objects.filter(is_active=True).values_list('program_type', flat=True)
    type_counts = {}
    for ptype in program_types:
        type_counts[ptype] = type_counts.get(ptype, 0) + 1
    
    return Response({
        'total_programs': total_programs,
        'total_eligibility_checks': total_checks,
        'total_applications': total_applications,
        'program_type_distribution': type_counts
    })