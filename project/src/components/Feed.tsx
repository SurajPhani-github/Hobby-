import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';

const posts = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      domain: 'Design'
    },
    content: {
      text: 'Just finished my latest UI design project! What do you think?',
      image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600'
    },
    likes: 234,
    comments: [
      { id: 1, user: 'Alex Kim', text: 'Love the color scheme!', timestamp: '15m' },
      { id: 2, user: 'Maria Garcia', text: 'The layout is so clean 👏', timestamp: '5m' }
    ],
    timestamp: '2h'
  },
  {
    id: 2,
    user: {
      name: 'Alex Kumar',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
      domain: 'Programming'
    },
    content: {
      text: 'Built my first React Native app! Here\'s a sneak peek of the interface.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600'
    },
    likes: 189,
    comments: [
      { id: 1, user: 'John Doe', text: 'Great work! How long did it take?', timestamp: '10m' }
    ],
    timestamp: '4h'
  }
];

export const Feed = () => {
  const [newComments, setNewComments] = useState<{[key: number]: string}>({});
  const [expandedComments, setExpandedComments] = useState<{[key: number]: boolean}>({});

  const handleCommentSubmit = (postId: number) => {
    if (newComments[postId]?.trim()) {
      // In a real app, this would make an API call to save the comment
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-medium text-sm">{post.user.name}</h3>
                <p className="text-xs text-gray-500">{post.user.domain} • {post.timestamp}</p>
              </div>
            </div>
            <button className="text-gray-500">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          {/* Image */}
          <img src={post.content.image} alt="" className="w-full aspect-[4/3] object-cover" />
          
          {/* Actions */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <button className="text-gray-700 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="text-gray-700 hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="text-gray-700 hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <button className="text-gray-700 hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
            
            {/* Caption */}
            <div className="space-y-1">
              <p className="text-sm font-medium">{post.likes} likes</p>
              <p className="text-sm">
                <span className="font-medium">{post.user.name}</span>{' '}
                {post.content.text}
              </p>
            </div>

            {/* Comments */}
            <div className="mt-2">
              {post.comments.slice(0, expandedComments[post.id] ? undefined : 2).map(comment => (
                <div key={comment.id} className="text-sm mt-1">
                  <span className="font-medium">{comment.user}</span>{' '}
                  {comment.text}
                  <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                </div>
              ))}
              
              {post.comments.length > 2 && !expandedComments[post.id] && (
                <button 
                  className="text-gray-500 text-sm mt-1"
                  onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: true }))}
                >
                  View all {post.comments.length} comments
                </button>
              )}

              {/* Comment Input */}
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  value={newComments[post.id] || ''}
                  onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                  placeholder="Add a comment..."
                  className="flex-1 text-sm bg-gray-50 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommentSubmit(post.id);
                    }
                  }}
                />
                <button 
                  onClick={() => handleCommentSubmit(post.id)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};