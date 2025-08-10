import React, { useState, useEffect } from 'react';
import { GovernmentProgram } from '../types';
import { eligibilityAPI } from '../services/api';
import { DollarSign, ExternalLink, Filter } from 'lucide-react';

const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<GovernmentProgram[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<GovernmentProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredPrograms(programs);
    } else {
      setFilteredPrograms(programs.filter(program => program.program_type === selectedType));
    }
  }, [programs, selectedType]);

  const fetchPrograms = async () => {
    try {
      const data = await eligibilityAPI.getPrograms();
      setPrograms(data);
      setFilteredPrograms(data);
    } catch (error) {
      setError('Failed to load programs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getProgramTypeColor = (type: string) => {
    const colors = {
      education: 'bg-blue-100 text-blue-800',
      healthcare: 'bg-green-100 text-green-800',
      food: 'bg-orange-100 text-orange-800',
      housing: 'bg-purple-100 text-purple-800',
      employment: 'bg-indigo-100 text-indigo-800',
      financial: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const programTypes = [
    { value: 'all', label: 'All Programs' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'food', label: 'Food Assistance' },
    { value: 'housing', label: 'Housing' },
    { value: 'employment', label: 'Employment' },
    { value: 'financial', label: 'Financial Aid' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 mb-4">{error}</p>
          <button onClick={fetchPrograms} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Government Benefit Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all available government programs for undergraduate students. 
            Each program has specific eligibility requirements and benefits.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field max-w-xs"
            >
              {programTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              Showing {filteredPrograms.length} of {programs.length} programs
            </span>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {program.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgramTypeColor(program.program_type)}`}>
                  {program.program_type.charAt(0).toUpperCase() + program.program_type.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {program.description}
              </p>
              
              <div className="space-y-2 mb-4">
                {program.max_benefit_amount && (
                  <div className="flex items-center text-sm text-gray-700">
                    <DollarSign className="h-4 w-4 mr-2 text-success-500" />
                    <span>Up to {formatCurrency(program.max_benefit_amount)}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {program.min_age && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      Min Age: {program.min_age}
                    </span>
                  )}
                  {program.max_age && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      Max Age: {program.max_age}
                    </span>
                  )}
                  {program.requires_enrollment && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Student Enrollment Required
                    </span>
                  )}
                  {program.requires_citizenship && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      Citizenship Required
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  {program.max_income ? `Max Income: ${formatCurrency(program.max_income)}` : 'No income limit'}
                </span>
                
                {program.application_url && (
                  <a
                    href={program.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No programs found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;