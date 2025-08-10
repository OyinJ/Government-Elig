import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EligibilityForm from '../components/Eligibility/EligibilityForm';
import EligibilityResults from '../components/Eligibility/EligibilityResults';
import { EligibilityInput, EligibilityCheck } from '../types';
import { eligibilityAPI } from '../services/api';

const CheckEligibility: React.FC = () => {
  const [results, setResults] = useState<EligibilityCheck | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEligibilityCheck = async (data: EligibilityInput) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await eligibilityAPI.checkEligibility(data);
      setResults(response.eligibility_check);
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to check eligibility. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewCheck = () => {
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!results ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Eligibility
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Answer a few questions to discover which government benefit programs you qualify for.
                All information is kept secure and private.
              </p>
            </div>
            
            {error && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="bg-error-50 border border-error-200 text-error-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              </div>
            )}
            
            <EligibilityForm onSubmit={handleEligibilityCheck} isLoading={isLoading} />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Eligibility Results
                </h1>
                <p className="text-gray-600">
                  Based on the information you provided, here are your eligible programs.
                </p>
              </div>
              <button
                onClick={handleNewCheck}
                className="btn-secondary"
              >
                New Check
              </button>
            </div>
            
            <EligibilityResults results={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckEligibility;