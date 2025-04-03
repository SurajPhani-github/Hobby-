import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  user: {
    name: string;
  };
  content: string;
  created_at: string;
}

export const Discussion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: { name: 'Arjun Sharma' },
      content: 'Hey everyone! How are you all doing?',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user: { name: 'Priya Patel' },
      content: 'I\'m good! Working on the new project.',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      user: { name: 'Rahul Verma' },
      content: 'Same here. The deadline is approaching fast!',
      created_at: new Date().toISOString()
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: { name: 'You' },
        content: newMessage,
        created_at: new Date().toISOString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-primary">
                {message.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{message.user.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-700">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}; 