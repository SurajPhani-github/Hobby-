import React from 'react';
import { Hero } from '../components/Hero';
import { DomainShowcase } from '../components/DomainShowcase';

export const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <DomainShowcase />
    </div>
  );
};