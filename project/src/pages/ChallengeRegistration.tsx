import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Ticket, Download, QrCode } from 'lucide-react';
import { domains } from '../data/domains';
import { useStore } from '../store/useStore';
import { registrationService } from '../services/registrationService';

interface RegistrationForm {
  name: string;
  email: string;
  username: string;
  portfolio: string;
  experience: string;
  motivation: string;
}

export const ChallengeRegistration = () => {
  const { id: domainId, challengeId } = useParams<{ id: string; challengeId: string }>();
  const navigate = useNavigate();
  const domain = domainId ? domains[domainId as keyof typeof domains] : null;
  const challenge = domain?.challenges.find(c => c.id === challengeId);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationTicket, setRegistrationTicket] = useState<ChallengeRegistration | null>(null);
  const { addRegistration } = useStore();

  const [formData, setFormData] = useState<RegistrationForm>({
    name: '',
    email: '',
    username: '',
    portfolio: '',
    experience: '',
    motivation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const registrationData = {
      challengeId: challengeId!,
      domainId: domainId!,
      ...formData
    };

    const ticket = {
      ...registrationData,
      id: Math.random().toString(36).substr(2, 9),
      registrationDate: new Date().toISOString(),
      ticketNumber: `TKT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };
    
    // Save to backend (Excel)
    const result = await registrationService.saveRegistration(ticket);
    
    if (result.success) {
      setRegistrationTicket(ticket);
      setIsSubmitted(true);
      
      // Redirect after 5 seconds
      setTimeout(() => {
        navigate(`/domain/${domainId}/challenges`);
      }, 5000);
    } else {
      alert(result.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!domain || !challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Challenge not found</h2>
          <p className="mt-2 text-gray-600">The challenge you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(`/domain/${domainId}/challenges`)}
            className="mt-4 inline-block btn-primary"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted && registrationTicket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">You've successfully joined {challenge?.title}</p>
              
              {/* Ticket */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 mb-6 border border-primary/20">
                <div className="flex items-center justify-center mb-6">
                  <Ticket className="w-8 h-8 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Your Registration Ticket</h3>
                </div>
                
                {/* QR Code Placeholder */}
                <div className="bg-white p-4 rounded-lg mb-6 inline-block">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Ticket Number:</span>
                    <span className="text-primary font-mono">{registrationTicket.ticketNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Name:</span>
                    <span>{registrationTicket.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Challenge:</span>
                    <span>{challenge?.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Registration Date:</span>
                    <span>{new Date(registrationTicket.registrationDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/20">
                  <p className="text-sm text-gray-500">
                    Please keep this ticket for future reference. You can download it below.
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    // Create a text content for download
                    const ticketContent = `
                      Registration Ticket
                      ===================
                      Ticket Number: ${registrationTicket.ticketNumber}
                      Name: ${registrationTicket.name}
                      Challenge: ${challenge?.title}
                      Registration Date: ${new Date(registrationTicket.registrationDate).toLocaleDateString()}
                      
                      Please keep this ticket for future reference.
                    `;
                    
                    const blob = new Blob([ticketContent], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ticket-${registrationTicket.ticketNumber}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  }}
                  className="btn-primary flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Ticket
                </button>
                <button
                  onClick={() => navigate(`/domain/${domainId}/challenges`)}
                  className="btn-secondary"
                >
                  Back to Challenges
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Redirecting you back to challenges in 5 seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(`/domain/${domainId}/challenges`)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Challenges
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join {challenge.title}
            </h1>
            <p className="text-gray-600">{challenge.description}</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio URL (optional)
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select your experience level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to join this challenge?
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us about your goals and what you hope to achieve..."
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-gray-600">
                <p>Challenge Deadline: {new Date(challenge.deadline).toLocaleDateString()}</p>
                <p>Current Participants: {challenge.participants}</p>
              </div>
              <button
                type="submit"
                className="btn-primary px-6 py-2"
              >
                Join Challenge
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 