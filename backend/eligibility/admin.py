from django.contrib import admin
from .models import GovernmentProgram, EligibilityCheck, ApplicationStatus

@admin.register(GovernmentProgram)
class GovernmentProgramAdmin(admin.ModelAdmin):
    list_display = ['name', 'program_type', 'max_benefit_amount', 'is_active', 'created_at']
    list_filter = ['program_type', 'is_active', 'requires_enrollment', 'requires_citizenship']
    search_fields = ['name', 'description']
    ordering = ['name']

@admin.register(EligibilityCheck)
class EligibilityCheckAdmin(admin.ModelAdmin):
    list_display = ['user', 'age', 'annual_income', 'is_student', 'total_potential_benefits', 'created_at']
    list_filter = ['is_student', 'is_citizen', 'created_at']
    search_fields = ['user__username', 'user__email']
    readonly_fields = ['created_at']

@admin.register(ApplicationStatus)
class ApplicationStatusAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'status', 'application_date', 'updated_at']
    list_filter = ['status', 'created_at', 'updated_at']
    search_fields = ['user__username', 'program__name']