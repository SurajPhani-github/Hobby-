import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FeedProps {
  domain: string;
}

export const Feed: React.FC<FeedProps> = ({ domain }) => {
  const { posts, likedPosts, savedPosts, toggleLike, toggleSave } = useStore();
  const [expandedComments, setExpandedComments] = useState<{[key: string]: boolean}>({});
  const [newComments, setNewComments] = useState<{[key: string]: string}>({});

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = (postId: string) => {
    if (newComments[postId]?.trim()) {
      // In a real app, this would make an API call to save the comment
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      {posts
        .filter(post => post.domain === domain)
        .map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b">
              <div className="flex items-center space-x-2">
                <img 
                  src={post.user.avatar_url} 
                  alt={post.user.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-sm">{post.user.name}</h3>
                  <p className="text-xs text-gray-500">@{post.user.username}</p>
                </div>
              </div>
              <button className="text-gray-500 p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            {/* Image */}
            {post.image_url && (
              <div className="aspect-square relative">
                <img 
                  src={post.image_url} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Actions */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`p-1 transition-colors ${
                      likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className="p-1 text-gray-700 hover:text-primary transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-700 hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={() => toggleSave(post.id)}
                  className={`p-1 transition-colors ${
                    savedPosts.has(post.id) ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <p className="text-sm font-medium">{post.likes.toLocaleString()} likes</p>
                <p className="text-sm">
                  <span className="font-medium">{post.user.username}</span>{' '}
                  {post.content}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>

              {/* Comments Preview */}
              <button 
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => toggleComments(post.id)}
              >
                View all comments
              </button>

              {/* Comments Section */}
              {expandedComments[post.id] && (
                <div className="mt-2 space-y-2">
                  {/* Sample comments - in a real app, these would come from the API */}
                  <div className="text-sm">
                    <span className="font-medium">user123</span>{' '}
                    Great post! Keep it up!
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">designer456</span>{' '}
                    Love the creativity!
                  </div>

                  {/* Comment Input */}
                  <div className="flex items-center space-x-2">
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
              )}
            </div>
          </div>
        ))}
    </div>
  );
};