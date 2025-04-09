import React, { useState } from 'react';
import { Grid, BookMarked, Heart, MessageCircle, Briefcase, Bookmark, User, Settings, Trophy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const Profile = () => {
  const { user, posts, likedPosts, savedPosts, challengeRegistrations } = useStore();
  const [activeTab, setActiveTab] = useState<'liked' | 'saved' | 'challenges'>('liked');
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const profileData = {
    name: user.name,
    avatar: user.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    bio: 'Computer Science student | UI/UX enthusiast | Learning Web Development',
    stats: {
      domains: 3,
      posts: 24,
      saved: 45,
      likes: 156
    },
    domains: ['Programming', 'Design', 'Writing'],
    work: [
      {
        title: 'Portfolio Website',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300',
        domain: 'Programming'
      },
      {
        title: 'Mobile App Design',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300',
        domain: 'Design'
      }
    ]
  };

  const filteredPosts = activeTab === 'liked' 
    ? posts.filter(post => likedPosts.has(post.id))
    : activeTab === 'saved'
    ? posts.filter(post => savedPosts.has(post.id))
    : [];

  return (
    <div className="pt-20 pb-20 container mx-auto px-4 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8 bg-white p-6 rounded-xl shadow-sm">
          <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full border-4 border-primary" />
          <div>
            <h1 className="text-2xl font-bold text-primary">{profileData.name}</h1>
            <p className="text-text mt-1">{profileData.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <Grid className="w-5 h-5 mb-2 text-primary" />
            <p className="font-semibold text-primary">{profileData.stats.domains}</p>
            <p className="text-sm text-text/70">Domains</p>
          </div>
          <div className="stat-card">
            <BookMarked className="w-5 h-5 mb-2 text-primary" />
            <p className="font-semibold text-primary">{profileData.stats.saved}</p>
            <p className="text-sm text-text/70">Saved</p>
          </div>
          <div className="stat-card">
            <Heart className="w-5 h-5 mb-2 text-primary" />
            <p className="font-semibold text-primary">{profileData.stats.likes}</p>
            <p className="text-sm text-text/70">Likes</p>
          </div>
          <div className="stat-card">
            <MessageCircle className="w-5 h-5 mb-2 text-primary" />
            <p className="font-semibold text-primary">{profileData.stats.posts}</p>
            <p className="text-sm text-text/70">Posts</p>
          </div>
        </div>

        {/* Domains */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-primary">My Domains</h2>
          <div className="flex space-x-3">
            {profileData.domains.map(domain => (
              <span key={domain} className="px-4 py-2 bg-primary/10 text-primary rounded-full">
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* My Work */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">My Work</h2>
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profileData.work.map((work, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img src={work.image} alt={work.title} className="w-full aspect-square object-cover rounded-lg" />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-semibold">{work.title}</h3>
                    <p className="text-sm">{work.domain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'liked'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Liked Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'saved'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span>Saved Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'challenges'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>My Challenges</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'challenges' ? (
          <div className="space-y-6">
            {challengeRegistrations.length > 0 ? (
              challengeRegistrations.map(registration => (
                <div key={registration.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{registration.challengeId}</h3>
                      <p className="text-sm text-gray-500">
                        Registered on {new Date(registration.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {registration.department}
                      </span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Year {registration.year}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Motivation</h4>
                      <p className="text-gray-600">{registration.motivation}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Experience</h4>
                      <p className="text-gray-600">{registration.experience}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Roll No: {registration.rollNo}</span>
                      <span>Status: Active</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Trophy className="w-12 h-12 mx-auto text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  No registered challenges yet
                </h3>
                <p className="text-gray-500 mt-2">
                  Join challenges to showcase your skills and learn from others
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Post Header */}
                <div className="p-3 flex items-center justify-between border-b">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={post.user.avatar_url} 
                      alt={post.user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-sm">{post.user.name}</h3>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-gray-800">{post.content}</p>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Post content"
                      className="mt-4 rounded-lg w-full"
                    />
                  )}
                </div>

                {/* Post Stats */}
                <div className="p-3 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </span>
                    </div>
                    <span>{post.domain}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="col-span-2 text-center py-12">
                <div className="text-gray-500 mb-4">
                  {activeTab === 'liked' ? (
                    <Heart className="w-12 h-12 mx-auto text-gray-300" />
                  ) : (
                    <Bookmark className="w-12 h-12 mx-auto text-gray-300" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  No {activeTab} posts yet
                </h3>
                <p className="text-gray-500 mt-2">
                  {activeTab === 'liked' 
                    ? 'Posts you like will appear here'
                    : 'Posts you save will appear here'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};