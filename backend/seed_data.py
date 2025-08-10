#!/usr/bin/env python
"""
Seed script to populate the database with sample government programs
Run this after setting up the database: python seed_data.py
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'government_benefits.settings')
django.setup()

from eligibility.models import GovernmentProgram

def create_sample_programs():
    """Create sample government benefit programs"""
    
    programs = [
        {
            'name': 'Federal Pell Grant',
            'program_type': 'education',
            'description': 'Need-based grants to help undergraduates pay for college or career school. Unlike loans, grants do not have to be repaid.',
            'max_benefit_amount': 7395.00,
            'application_url': 'https://studentaid.gov/h/apply-for-aid/fafsa',
            'min_age': 16,
            'max_age': None,
            'max_income': 60000.00,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
        {
            'name': 'Direct Subsidized Loans',
            'program_type': 'education',
            'description': 'Low-interest loans for undergraduate students with financial need. The government pays the interest while you\'re in school.',
            'max_benefit_amount': 5500.00,
            'application_url': 'https://studentaid.gov/understand-aid/types/loans/subsidized-unsubsidized',
            'min_age': 16,
            'max_age': None,
            'max_income': 50000.00,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
        {
            'name': 'Federal Work-Study Program',
            'program_type': 'employment',
            'description': 'Part-time employment program for undergraduate students with financial need, allowing students to work part-time to help pay education expenses.',
            'max_benefit_amount': 4000.00,
            'application_url': 'https://studentaid.gov/understand-aid/types/work-study',
            'min_age': 16,
            'max_age': None,
            'max_income': 40000.00,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
        {
            'name': 'SNAP (Food Stamps)',
            'program_type': 'food',
            'description': 'Supplemental Nutrition Assistance Program provides food-purchasing assistance for low- and no-income people.',
            'max_benefit_amount': 281.00,  # Monthly amount
            'application_url': 'https://www.fns.usda.gov/snap/apply',
            'min_age': 18,
            'max_age': None,
            'max_income': 25000.00,
            'requires_enrollment': False,
            'requires_citizenship': True,
        },
        {
            'name': 'Medicaid',
            'program_type': 'healthcare',
            'description': 'Health insurance program for low-income individuals and families, including many low-income adults, children, pregnant women, elderly adults and people with disabilities.',
            'max_benefit_amount': 8000.00,  # Annual coverage value
            'application_url': 'https://www.medicaid.gov/medicaid/how-to-apply/index.html',
            'min_age': 18,
            'max_age': None,
            'max_income': 30000.00,
            'requires_enrollment': False,
            'requires_citizenship': True,
        },
        {
            'name': 'Federal Supplemental Educational Opportunity Grant (SEOG)',
            'program_type': 'education',
            'description': 'Additional grant money for undergraduate students with exceptional financial need. Priority is given to Pell Grant recipients.',
            'max_benefit_amount': 4000.00,
            'application_url': 'https://studentaid.gov/understand-aid/types/grants/fseog',
            'min_age': 16,
            'max_age': None,
            'max_income': 30000.00,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
        {
            'name': 'TEACH Grant',
            'program_type': 'education',
            'description': 'Grants for students who plan to teach in high-need fields in low-income elementary and secondary schools.',
            'max_benefit_amount': 4000.00,
            'application_url': 'https://studentaid.gov/understand-aid/types/grants/teach',
            'min_age': 18,
            'max_age': None,
            'max_income': None,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
        {
            'name': 'State University Grant Program',
            'program_type': 'education',
            'description': 'State-funded grants for residents attending in-state public universities. Amounts and eligibility vary by state.',
            'max_benefit_amount': 3000.00,
            'application_url': 'https://www.nasfaa.org/State_Financial_Aid_Programs',
            'min_age': 17,
            'max_age': None,
            'max_income': 45000.00,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
        {
            'name': 'WIC (Women, Infants, and Children)',
            'program_type': 'food',
            'description': 'Nutrition program for pregnant women, new mothers, and young children up to age 5 who are at nutritional risk.',
            'max_benefit_amount': 150.00,  # Monthly amount
            'application_url': 'https://www.fns.usda.gov/wic',
            'min_age': 16,
            'max_age': 50,
            'max_income': 35000.00,
            'requires_enrollment': False,
            'requires_citizenship': True,
        },
        {
            'name': 'Emergency Financial Aid Grants',
            'program_type': 'financial',
            'description': 'Emergency grants to help students with unexpected expenses that threaten their ability to continue their education.',
            'max_benefit_amount': 2500.00,
            'application_url': 'https://studentaid.gov/understand-aid/types/grants',
            'min_age': 16,
            'max_age': None,
            'max_income': None,
            'requires_enrollment': True,
            'requires_citizenship': True,
        },
    ]
    
    created_count = 0
    for program_data in programs:
        program, created = GovernmentProgram.objects.get_or_create(
            name=program_data['name'],
            defaults=program_data
        )
        if created:
            created_count += 1
            print(f"Created: {program.name}")
        else:
            print(f"Already exists: {program.name}")
    
    print(f"\nSeed completed! Created {created_count} new programs.")
    print(f"Total programs in database: {GovernmentProgram.objects.count()}")

if __name__ == '__main__':
    create_sample_programs()