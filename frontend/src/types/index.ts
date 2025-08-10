export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

export interface GovernmentProgram {
  id: number;
  name: string;
  program_type: 'education' | 'healthcare' | 'food' | 'housing' | 'employment' | 'financial';
  description: string;
  max_benefit_amount?: number;
  application_url?: string;
  min_age?: number;
  max_age?: number;
  max_income?: number;
  requires_enrollment: boolean;
  requires_citizenship: boolean;
  is_active: boolean;
}

export interface EligibilityInput {
  age: number;
  annual_income: number;
  is_student: boolean;
  is_citizen: boolean;
  household_size: number;
  state: string;
}

export interface EligibilityCheck {
  id: number;
  age: number;
  annual_income: number;
  is_student: boolean;
  is_citizen: boolean;
  household_size: number;
  state: string;
  eligible_programs: GovernmentProgram[];
  total_potential_benefits: number;
  created_at: string;
}

export interface ApplicationStatus {
  id: number;
  program: GovernmentProgram;
  status: 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'denied' | 'pending_documents';
  application_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface UserDocument {
  id: number;
  document_type: 'tax_return' | 'bank_statement' | 'pay_stub' | 'transcript' | 'fafsa' | 'id_document' | 'other';
  file: string;
  original_filename: string;
  uploaded_at: string;
  verified: boolean;
}

export interface AuthResponse {
  message: string;
  user?: User;
}

export interface EligibilityResponse {
  eligibility_check: EligibilityCheck;
  message: string;
}