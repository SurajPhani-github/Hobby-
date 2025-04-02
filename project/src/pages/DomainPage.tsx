import React from 'react';
import { useParams, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MessageCircle, Users, Trophy, Heart, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { Discussion } from './Discussion';
import { domains, DomainId } from '../data/domains';

export const DomainPage = () => {
  const { id } = useParams<{ id: DomainId }>();
  const location = useLocation();
  
  const domain = id ? domains[id as DomainId] : null;

  if (!domain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Domain not found</h2>
          <p className="mt-2 text-gray-600">The domain you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    return location.pathname === `/domain/${id}${path}`;
  };

  const Icon = domain.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Domain Banner */}
      <div className="relative h-48 md:h-64">
        <img 
          src={domain.banner} 
          alt={domain.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-4 h-full flex items-end pb-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-8 h-8" />
                <h1 className="text-3xl font-bold">{domain.name}</h1>
              </div>
              <p className="text-white/90">{domain.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            <div className="text-center">
              <p className="text-2xl font-semibold">{domain.stats.members}</p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{domain.stats.posts}</p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{domain.stats.discussions}</p>
              <p className="text-sm text-gray-600">Discussions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 py-6">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-20">
              <nav className="space-y-2">
                <Link
                  to={`/domain/${id}`}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('') ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Community Feed</span>
                </Link>
                <Link
                  to={`/domain/${id}/discussion`}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('/discussion') ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Discussions</span>
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

          {/* Main Content Area */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  {domain.posts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <h3 className="font-semibold">{post.user.name}</h3>
                            <p className="text-sm text-gray-500">{post.timestamp} ago</p>
                          </div>
                        </div>
                        <button className="text-gray-500">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <img src={post.content.image} alt="" className="w-full aspect-video object-cover" />
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <button className="text-gray-700 hover:text-red-500 transition-colors">
                              <Heart className="w-6 h-6" />
                            </button>
                            <button className="text-gray-700 hover:text-primary transition-colors">
                              <MessageCircle className="w-6 h-6" />
                            </button>
                            <button className="text-gray-700 hover:text-primary transition-colors">
                              <Share2 className="w-6 h-6" />
                            </button>
                          </div>
                          <button className="text-gray-700 hover:text-primary transition-colors">
                            <Bookmark className="w-6 h-6" />
                          </button>
                        </div>
                        
                        <p className="font-semibold mb-1">{post.likes} likes</p>
                        <p>
                          <span className="font-semibold">{post.user.name}</span>{' '}
                          {post.content.text}
                        </p>
                        <button className="text-gray-500 text-sm mt-1">
                          View all {post.comments} comments
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              } />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/challenges" element={
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Active Challenges</h2>
                  {domain.challenges.map(challenge => (
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
                        <button className="btn-primary">Join Challenge</button>
                      </div>
                    </div>
                  ))}
                </div>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};