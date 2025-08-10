from rest_framework import serializers
from .models import GovernmentProgram, EligibilityCheck, ApplicationStatus

class GovernmentProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentProgram
        fields = '__all__'

class EligibilityCheckSerializer(serializers.ModelSerializer):
    eligible_programs = GovernmentProgramSerializer(many=True, read_only=True)
    
    class Meta:
        model = EligibilityCheck
        fields = ['id', 'age', 'annual_income', 'is_student', 'is_citizen', 
                 'household_size', 'state', 'eligible_programs', 
                 'total_potential_benefits', 'created_at']
        read_only_fields = ['id', 'created_at', 'eligible_programs', 'total_potential_benefits']

class EligibilityInputSerializer(serializers.Serializer):
    """Serializer for eligibility check input"""
    age = serializers.IntegerField(min_value=16, max_value=100)
    annual_income = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=0)
    is_student = serializers.BooleanField()
    is_citizen = serializers.BooleanField()
    household_size = serializers.IntegerField(min_value=1, max_value=20)
    state = serializers.CharField(max_length=50)

class ApplicationStatusSerializer(serializers.ModelSerializer):
    program = GovernmentProgramSerializer(read_only=True)
    program_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = ApplicationStatus
        fields = ['id', 'program', 'program_id', 'status', 'application_date', 
                 'notes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)