from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserDocument

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('date_of_birth', 'phone_number', 'address', 'city', 'state', 'zip_code')
        }),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {
            'fields': ('date_of_birth', 'phone_number', 'address', 'city', 'state', 'zip_code')
        }),
    )

@admin.register(UserDocument)
class UserDocumentAdmin(admin.ModelAdmin):
    list_display = ['user', 'document_type', 'uploaded_at', 'verified']
    list_filter = ['document_type', 'verified', 'uploaded_at']
    search_fields = ['user__username', 'user__email']