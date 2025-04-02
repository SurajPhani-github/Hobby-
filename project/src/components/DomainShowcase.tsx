import React from 'react';
import { Link } from 'react-router-dom';
import { domains } from '../data/domains';
import { ArrowRight } from 'lucide-react';

export const DomainShowcase = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Explore Your Interests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.values(domains).map((domain) => {
            const Icon = domain.icon;
            return (
              <Link
                to={`/domain/${domain.id}`}
                key={domain.id}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0">
                  <img 
                    src={domain.banner} 
                    alt={domain.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                
                <div className="relative p-8 h-[320px] flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{domain.name}</h3>
                  </div>
                  
                  <p className="text-white/80 mb-4 line-clamp-2">{domain.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-white/90">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{domain.stats.members.toLocaleString()}</p>
                        <p className="text-xs opacity-80">Active Members</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{domain.stats.discussions.toLocaleString()}</p>
                        <p className="text-xs opacity-80">Discussions</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{domain.stats.posts.toLocaleString()}</p>
                        <p className="text-xs opacity-80">Posts</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm"
                          />
                        ))}
                      </div>
                      <div className="group-hover:translate-x-2 transition-transform duration-300">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};