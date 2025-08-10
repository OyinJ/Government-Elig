import React from 'react';
import { EligibilityCheck } from '../../types';
import { CheckCircle, XCircle, DollarSign, ExternalLink } from 'lucide-react';

interface EligibilityResultsProps {
  results: EligibilityCheck;
}

const EligibilityResults: React.FC<EligibilityResultsProps> = ({ results }) => {
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

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary-900">
              {results.eligible_programs.length} Programs Found
            </h3>
            <p className="text-primary-700 mt-1">
              You're eligible for these government benefit programs
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-primary-600" />
              <span className="text-2xl font-bold text-primary-900">
                {formatCurrency(results.total_potential_benefits)}
              </span>
            </div>
            <p className="text-sm text-primary-700">Total Potential Benefits</p>
          </div>
        </div>
      </div>

      {/* Eligible Programs */}
      {results.eligible_programs.length > 0 && (
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-success-500 mr-2" />
            Eligible Programs
          </h4>
          <div className="grid gap-4">
            {results.eligible_programs.map((program) => (
              <div key={program.id} className="card border-l-4 border-l-success-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="text-lg font-semibold text-gray-900">{program.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgramTypeColor(program.program_type)}`}>
                        {program.program_type.charAt(0).toUpperCase() + program.program_type.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{program.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {program.max_benefit_amount && (
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Up to {formatCurrency(program.max_benefit_amount)}
                          </span>
                        )}
                        {program.min_age && (
                          <span>Min Age: {program.min_age}</span>
                        )}
                        {program.max_age && (
                          <span>Max Age: {program.max_age}</span>
                        )}
                      </div>
                      
                      {program.application_url && (
                        <a
                          href={program.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <span>Apply Now</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Programs Found */}
      {results.eligible_programs.length === 0 && (
        <div className="card text-center py-8">
          <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Eligible Programs Found</h4>
          <p className="text-gray-600 mb-4">
            Based on the information provided, you don't currently qualify for any programs in our database.
          </p>
          <p className="text-sm text-gray-500">
            This doesn't mean you're not eligible for other programs. Consider updating your information or 
            checking back later as eligibility requirements may change.
          </p>
        </div>
      )}

      {/* Next Steps */}
      <div className="card bg-gray-50">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            Review the eligible programs and their requirements
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            Gather required documents (tax returns, transcripts, etc.)
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            Click "Apply Now" to visit the official application websites
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            Track your application status in your dashboard
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EligibilityResults;