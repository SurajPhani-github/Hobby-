import { Post, User } from '../types';

const API_BASE_URL = 'http://localhost:3001'; // Update this with your actual API URL

// Mock data for development
const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Tarun',
      email: 'tarun@example.com',
      username: 'tarun_dev',
      avatar_url: 'https://i.pravatar.cc/150?img=1'
    },
    content: 'Just completed my first project! 🚀',
    image_url: 'https://picsum.photos/800/400?random=1',
    likes: 15,
    created_at: new Date().toISOString(),
    domain: 'programming'
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Sidddharth',
      email: 'siddharth@example.com',
      username: 'siddharth_design',
      avatar_url: 'https://i.pravatar.cc/150?img=2'
    },
    content: 'Check out this amazing design I created!',
    image_url: 'https://picsum.photos/800/400?random=2',
    likes: 8,
    created_at: new Date().toISOString(),
    domain: 'design'
  }
];

export const api = {
  getPosts: async (domain?: string): Promise<Post[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (domain) {
      return mockPosts.filter(post => post.domain === domain);
    }
    return mockPosts;
  },

  createPost: async (post: Omit<Post, 'id' | 'created_at'>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    
    mockPosts.unshift(newPost);
    return newPost;
  },

  deletePost: async (postId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPosts.findIndex(post => post.id === postId);
    if (index !== -1) {
      mockPosts.splice(index, 1);
    }
  },

  updatePost: async (postId: string, updates: Partial<Post>): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPosts.findIndex(post => post.id === postId);
    if (index === -1) {
      throw new Error('Post not found');
    }
    
    mockPosts[index] = { ...mockPosts[index], ...updates };
    return mockPosts[index];
  },

  likePost: async (postId: string): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      throw new Error('Post not found');
    }
    
    post.likes += 1;
    return post.likes;
  }
}; 