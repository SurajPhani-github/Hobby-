import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';

export const Discussion = () => {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      user: {
        name: 'Aishwarya',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },
      message: 'Has anyone worked with React Native animations?',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      user: {
        name: 'Babu',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150'
      },
      message: 'Yes! Ive used Reanimated 2. Its great for complex animations.',
      timestamp: '2:32 PM'
    }
  ];

  return (
    <div className="pt-16 pb-20 h-screen flex">
      <div className="container mx-auto px-4 flex h-full">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Programming Discussion</h2>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Search in discussion..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="flex items-start space-x-3">
                <img src={msg.user.avatar} alt={msg.user.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2">
                    <h3 className="font-semibold">{msg.user.name}</h3>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};