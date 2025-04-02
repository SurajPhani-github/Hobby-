import React from 'react';
import { GraduationCap, Users, Rocket } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative bg-background min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
            Connect, Learn, Evolve
            <span className="block text-primary">Beyond the Rat Race</span>
          </h1>
          <p className="text-xl text-text/80 mb-8">
            Join a community of ambitious students sharing knowledge, building skills, and creating opportunities together.
          </p>
          <button className="btn-primary text-lg">
            Start Your Journey
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Growth",
                description: "Master new skills with structured learning paths and expert guidance"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Connection",
                description: "Build meaningful relationships with peers who share your interests"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Opportunity",
                description: "Discover and create opportunities for your future career"
              }
            ].map((item, index) => (
              <div key={index} className="card bg-white/80 backdrop-blur">
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-text/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};