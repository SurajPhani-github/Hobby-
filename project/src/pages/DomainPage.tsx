import React, { useState, useEffect } from 'react';
import { useParams, Routes, Route, Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Trophy, Heart, Bookmark, Share2, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Feed } from '../components/Feed';
import { Discussion } from '../components/Discussion';
import { useStore } from '../store/useStore';

interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: string;
  participants: number;
}

interface Domain {
  id: string;
  name: string;
  description: string;
  challenges: Challenge[];
}

export const DomainPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getDomain, getDomainChallenges, fetchPosts, registerForChallenge } = useStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  
  const domain = id ? getDomain(id) : null;
  const challenges = id ? getDomainChallenges(id) : [];
  
  useEffect(() => {
    if (id) {
      fetchPosts(id);
    }
  }, [id, fetchPosts]);
  
  if (!domain) {
    return <div>Domain not found</div>;
  }

  const isActive = (path: string) => {
    return location.pathname.endsWith(path);
  };

  const handleChallengeRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return; // Return if no challenge ID
    
    const formData = new FormData(e.target as HTMLFormElement);
    const registration = {
      userId: 'current-user-id', // This should come from the store
      challengeId: id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
      year: formData.get('year') as string,
      rollNo: formData.get('rollNo') as string,
      motivation: formData.get('motivation') as string,
      experience: formData.get('experience') as string
    };

    registerForChallenge(registration);
    setRegistrationData(registration);
    setShowSuccess(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex">
        <div className="w-64 bg-white border-r">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{domain.name}</h1>
            <p className="text-gray-600 mb-6">{domain.description}</p>
            <nav className="space-y-2">
              <Link
                to={`/domain/${id}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('') ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Feed</span>
              </Link>
              <Link
                to={`/domain/${id}/discussion`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/discussion') ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Discussion</span>
              </Link>
              <Link
                to={`/domain/${id}/challenges`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/challenges') ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Challenges</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Feed domain={domain.id} />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/challenges" element={
              <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Challenges</h2>
                </div>
                
                <div className="space-y-4">
                  {challenges.map(challenge => (
                    <div key={challenge.id} className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {challenge.participants} participants
                          </span>
                          <span className="text-sm text-gray-500">
                            Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                          </span>
                        </div>
                        <Link
                          to={`/domain/${id}/challenges/${challenge.id}/register`}
                          className="btn-primary"
                        >
                          Join Challenge
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/challenges/:challengeId/register" element={
              <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mx-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Challenge</h2>
                    <p className="text-gray-600">Fill out the form below to register for this challenge</p>
                  </div>

                  <form className="space-y-4" onSubmit={handleChallengeRegistration}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your name"
                          name="name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your email"
                          name="email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" name="department" required>
                        <option value="">Select your department</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ECE">Electronics</option>
                        <option value="MECH">Mechanical</option>
                        <option value="CIVIL">Civil</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" name="year" required>
                          <option value="">Select your year</option>
                          <option value="1">First Year</option>
                          <option value="2">Second Year</option>
                          <option value="3">Third Year</option>
                          <option value="4">Fourth Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Roll Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your roll number"
                          name="rollNo"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Why do you want to join this challenge?
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={3}
                        placeholder="Tell us about your motivation and what you hope to achieve..."
                        name="motivation"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Any previous experience?
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={2}
                        placeholder="Share any relevant experience or skills..."
                        name="experience"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      >
                        Register for Challenge
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>

      {showSuccess && registrationData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-gray-600">You have successfully registered for the challenge.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-lg mb-4">Registration Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{registrationData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{registrationData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{registrationData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{registrationData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Roll No:</span>
                  <span className="font-medium">{registrationData.rollNo}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate(-1);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate('/profile');
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainPage;