import React from 'react';
import { Grid, BookMarked, Heart, MessageCircle, Briefcase } from 'lucide-react';

export const Profile = () => {
  const user = {
    name: 'Jayanth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
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

  return (
    <div className="pt-20 pb-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <Grid className="w-5 h-5 mb-2" />
            <p className="font-semibold">{user.stats.domains}</p>
            <p className="text-sm text-gray-500">Domains</p>
          </div>
          <div className="stat-card">
            <BookMarked className="w-5 h-5 mb-2" />
            <p className="font-semibold">{user.stats.saved}</p>
            <p className="text-sm text-gray-500">Saved</p>
          </div>
          <div className="stat-card">
            <Heart className="w-5 h-5 mb-2" />
            <p className="font-semibold">{user.stats.likes}</p>
            <p className="text-sm text-gray-500">Likes</p>
          </div>
          <div className="stat-card">
            <MessageCircle className="w-5 h-5 mb-2" />
            <p className="font-semibold">{user.stats.posts}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
        </div>

        {/* Domains */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">My Domains</h2>
          <div className="flex space-x-3">
            {user.domains.map(domain => (
              <span key={domain} className="px-4 py-2 bg-primary/10 text-primary rounded-full">
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* My Work */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Work</h2>
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {user.work.map((work, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img src={work.image} alt={work.title} className="w-full aspect-square object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-semibold">{work.title}</h3>
                    <p className="text-sm">{work.domain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};