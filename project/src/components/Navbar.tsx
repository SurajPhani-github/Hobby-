import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">SP</Link>
          
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search domains, posts, people..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/" className="nav-icon">
              <Home className="w-6 h-6" />
            </Link>
            <button className="nav-icon">
              <PlusSquare className="w-6 h-6" />
            </button>
            <Link to="/likes" className="nav-icon">
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/profile" className="nav-icon">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}