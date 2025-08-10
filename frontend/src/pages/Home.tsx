import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, DollarSign, FileText, ArrowRight, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your personal information is protected with bank-level security.',
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Specifically designed for undergraduate students and young adults.',
    },
    {
      icon: DollarSign,
      title: 'Maximize Benefits',
      description: 'Discover all the financial aid and benefits you qualify for.',
    },
    {
      icon: FileText,
      title: 'Document Support',
      description: 'Upload and manage required documents for your applications.',
    },
  ];

  const benefits = [
    'Federal Pell Grants up to $7,395',
    'Direct Subsidized Student Loans',
    'Federal Work-Study Programs',
    'SNAP Food Assistance',
    'Medicaid Healthcare Coverage',
    'State-Specific Education Grants',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Government Benefits
              <span className="block text-primary-200">You're Eligible For</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              A comprehensive platform helping undergraduate students find and access 
              government programs for education, healthcare, and financial assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/check-eligibility" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
                  Check Your Eligibility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                    Get Started Free
                  </Link>
                  <Link to="/programs" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                    Browse Programs
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GovBenefits?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We simplify the complex process of finding and applying for government benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Programs Available to Students
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform covers a wide range of federal and state programs designed 
                to support undergraduate students with education costs, healthcare, and basic needs.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Average Benefits</h3>
                <p className="text-gray-600">Per eligible student per year</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Education Grants</span>
                  <span className="font-semibold text-gray-900">$3,000 - $7,395</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Student Loans</span>
                  <span className="font-semibold text-gray-900">$3,500 - $12,500</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Food Assistance</span>
                  <span className="font-semibold text-gray-900">$200 - $400/month</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Healthcare Coverage</span>
                  <span className="font-semibold text-gray-900">$2,000 - $8,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Benefits?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who have already found the financial support they need.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;