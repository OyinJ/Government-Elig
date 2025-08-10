import React, { useState } from 'react';
import { EligibilityInput } from '../../types';
import { CheckCircle } from 'lucide-react';

interface EligibilityFormProps {
  onSubmit: (data: EligibilityInput) => void;
  isLoading: boolean;
}

const EligibilityForm: React.FC<EligibilityFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<EligibilityInput>({
    age: 18,
    annual_income: 0,
    is_student: true,
    is_citizen: true,
    household_size: 1,
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircle className="h-8 w-8 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Check Your Eligibility</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="16"
              max="100"
              required
              className="input-field"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="annual_income" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income ($) *
            </label>
            <input
              type="number"
              id="annual_income"
              name="annual_income"
              min="0"
              step="0.01"
              required
              className="input-field"
              placeholder="0.00"
              value={formData.annual_income}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="household_size" className="block text-sm font-medium text-gray-700 mb-2">
              Household Size *
            </label>
            <input
              type="number"
              id="household_size"
              name="household_size"
              min="1"
              max="20"
              required
              className="input-field"
              value={formData.household_size}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <select
              id="state"
              name="state"
              required
              className="input-field"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_student"
              name="is_student"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={formData.is_student}
              onChange={handleChange}
            />
            <label htmlFor="is_student" className="ml-2 block text-sm text-gray-700">
              I am currently enrolled as a student
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_citizen"
              name="is_citizen"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={formData.is_citizen}
              onChange={handleChange}
            />
            <label htmlFor="is_citizen" className="ml-2 block text-sm text-gray-700">
              I am a U.S. citizen or eligible non-citizen
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Checking Eligibility...' : 'Check Eligibility'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EligibilityForm;