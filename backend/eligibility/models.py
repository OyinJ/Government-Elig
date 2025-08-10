from django.db import models
from users.models import User

class GovernmentProgram(models.Model):
    """Model for government benefit programs"""
    PROGRAM_TYPES = [
        ('education', 'Education'),
        ('healthcare', 'Healthcare'),
        ('food', 'Food Assistance'),
        ('housing', 'Housing'),
        ('employment', 'Employment'),
        ('financial', 'Financial Aid'),
    ]
    
    name = models.CharField(max_length=200)
    program_type = models.CharField(max_length=20, choices=PROGRAM_TYPES)
    description = models.TextField()
    max_benefit_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    application_url = models.URLField(blank=True)
    
    # Eligibility criteria
    min_age = models.IntegerField(null=True, blank=True)
    max_age = models.IntegerField(null=True, blank=True)
    max_income = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    requires_enrollment = models.BooleanField(default=False)  # College enrollment
    requires_citizenship = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class EligibilityCheck(models.Model):
    """Model to store eligibility check results"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='eligibility_checks')
    
    # User information at time of check
    age = models.IntegerField()
    annual_income = models.DecimalField(max_digits=10, decimal_places=2)
    is_student = models.BooleanField()
    is_citizen = models.BooleanField()
    household_size = models.IntegerField()
    state = models.CharField(max_length=50)
    
    # Results
    eligible_programs = models.ManyToManyField(GovernmentProgram, related_name='eligible_users')
    total_potential_benefits = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%Y-%m-%d')}"

class ApplicationStatus(models.Model):
    """Track application status for programs"""
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
        ('pending_documents', 'Pending Documents'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    program = models.ForeignKey(GovernmentProgram, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    application_date = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'program']
    
    def __str__(self):
        return f"{self.user.username} - {self.program.name} - {self.status}"