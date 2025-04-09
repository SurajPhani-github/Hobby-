import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, Trash2, Edit2, Flag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { api } from '../services/api';
import { Post } from '../types';

interface FeedProps {
  domain: string;
}

export const Feed: React.FC<FeedProps> = ({ domain }) => {
  const { user, likedPosts, savedPosts, toggleLike, toggleSave } = useStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<{[key: string]: boolean}>({});
  const [newComments, setNewComments] = useState<{[key: string]: string}>({});
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
  }, [domain]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await api.getPosts(domain);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await api.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = async (postId: string) => {
    try {
      const updatedPost = await api.updatePost(postId, { content: editContent });
      setPosts(posts.map(post => post.id === postId ? updatedPost : post));
      setEditingPost(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const newLikes = await api.likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: newLikes } : post
      ));
      toggleLike(postId);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    try {
      const postData = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        },
        content: newPostContent,
        image_url: newPostImage ? URL.createObjectURL(newPostImage) : undefined,
        likes: 0,
        domain
      };

      const newPost = await api.createPost(postData);
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setNewPostImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = async (postId: string) => {
    if (newComments[postId]?.trim()) {
      // In a real app, this would make an API call to save the comment
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      {/* Create Post Form */}
      {user && (
        <form onSubmit={handleCreatePost} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer text-gray-500 hover:text-primary">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPostImage(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </label>
              {newPostImage && (
                <span className="text-sm text-gray-500">
                  {newPostImage.name}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </form>
      )}

      {/* Posts */}
      {posts.map(post => (
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
                <p className="text-xs text-gray-500">@{post.user.email.split('@')[0]}</p>
              </div>
            </div>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                className="text-gray-500 p-1 hover:text-gray-700"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              {openMenuId === post.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  {user?.id === post.user.id ? (
                    <>
                      <button
                        onClick={() => {
                          setEditingPost(post.id);
                          setEditContent(post.content);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit Post</span>
                      </button>
                      <button
                        onClick={() => {
                          handleDeletePost(post.id);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Post</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        // Handle report functionality
                        setOpenMenuId(null);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Flag className="w-4 h-4" />
                      <span>Report Post</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          {editingPost === post.id ? (
            <div className="p-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEditPost(post.id)}
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
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
          )}
          
          {/* Actions */}
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
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
            
            <div className="space-y-1">
              <p className="text-sm font-medium">{post.likes.toLocaleString()} likes</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>

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