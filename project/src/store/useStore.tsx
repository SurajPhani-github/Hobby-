import { create } from 'zustand';
import { domains } from '../data/domains';
import { Post as PostType, User, Challenge, ChallengeRegistration } from '../types';
import { api } from '../services/api';

interface Post {
  id: string;
  user: User;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  domain: string;
}

interface Message {
  id: string;
  user: User;
  content: string;
  created_at: string;
}

interface Discussion {
  id: string;
  title: string;
  domain: string;
  messages: Message[];
  participants: number;
}

interface Store {
  user: User | null;
  users: User[];
  posts: PostType[];
  likedPosts: Set<string>;
  savedPosts: Set<string>;
  discussions: Discussion[];
  currentDiscussion: Discussion | null;
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
  challengeRegistrations: ChallengeRegistration[];
  setUser: (user: User | null) => void;
  registerUser: (userData: Omit<User, 'id'>) => void;
  registerForChallenge: (registration: Omit<ChallengeRegistration, 'id' | 'registrationDate'>) => void;
  logout: () => void;
  fetchPosts: (domain?: string) => Promise<void>;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  sendMessage: (content: string, domain: string) => void;
  createDiscussion: (title: string, domain: string) => void;
  setCurrentDiscussion: (discussion: Discussion | null) => void;
  getDomain: (id: string) => typeof domains[keyof typeof domains] | undefined;
  getDomainPosts: (domainId: string) => Post[];
  getDomainChallenges: (domainId: string) => Challenge[];
  createPost: (post: Omit<Post, 'id' | 'created_at'>) => Promise<void>;
}

const INDIAN_NAMES = [
  { name: 'Arjun Sharma', username: 'arjun_dev' },
  { name: 'Priya Patel', username: 'priya.designs' },
  { name: 'Rahul Verma', username: 'rahul.codes' },
  { name: 'Neha Gupta', username: 'neha.clicks' },
  { name: 'Amit Kumar', username: 'amit.beats' },
  { name: 'Divya Singh', username: 'divya.creates' },
  { name: 'Vikram Malhotra', username: 'vikram.tech' },
  { name: 'Anjali Desai', username: 'anjali.art' }
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomUser(): User {
  const randomIndex = Math.floor(Math.random() * INDIAN_NAMES.length);
  const user = INDIAN_NAMES[randomIndex];
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: user.name,
    email: `${user.username}@example.com`,
    username: user.username,
    avatar_url: `https://source.unsplash.com/random/150x150/?portrait&${randomIndex}`
  };
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  users: [],
  posts: [],
  likedPosts: new Set(),
  savedPosts: new Set(),
  discussions: Object.values(domains).flatMap(domain => 
    Array.from({ length: 3 }, (_, i) => ({
      id: `${domain.id}_discussion_${i}`,
      title: `${domain.name} Discussion ${i + 1}`,
      domain: domain.id,
      messages: Array.from({ length: getRandomInt(2, 5) }, (_, j) => ({
        id: `${domain.id}_message_${i}_${j}`,
        user: getRandomUser(),
        content: `This is a sample message ${j + 1} in ${domain.name} discussion ${i + 1}`,
        created_at: new Date(Date.now() - getRandomInt(0, 24) * 60 * 60 * 1000).toISOString()
      })),
      participants: getRandomInt(3, 10)
    }))
  ),
  currentDiscussion: null,
  challenges: [],
  loading: false,
  error: null,
  challengeRegistrations: [],

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },

  registerUser: (userData) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData
    };
    set(state => ({
      users: [...state.users, newUser],
      user: newUser
    }));
    localStorage.setItem('user', JSON.stringify(newUser));
  },

  registerForChallenge: (registration) => {
    const newRegistration: ChallengeRegistration = {
      id: Math.random().toString(36).substr(2, 9),
      registrationDate: new Date().toISOString(),
      ...registration
    };
    set(state => ({
      challengeRegistrations: [...state.challengeRegistrations, newRegistration]
    }));
    // Store in localStorage
    const registrations = JSON.parse(localStorage.getItem('challengeRegistrations') || '[]');
    localStorage.setItem('challengeRegistrations', JSON.stringify([...registrations, newRegistration]));
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },

  getDomain: (id) => domains[id as keyof typeof domains],

  getDomainPosts: (domainId) => {
    const domain = domains[domainId as keyof typeof domains];
    if (!domain) return [];
    
    return domain.posts.map(post => ({
      id: post.id.toString(),
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name: post.user.name,
        email: `${post.user.name.toLowerCase().replace(/\s+/g, '_')}@example.com`,
        username: post.user.name.toLowerCase().replace(/\s+/g, '_'),
        avatar_url: post.user.avatar
      },
      content: post.content.text,
      image_url: post.content.image,
      likes: post.likes,
      created_at: new Date(Date.now() - getRandomInt(0, 24) * 60 * 60 * 1000).toISOString(),
      domain: domainId
    }));
  },

  getDomainChallenges: (domainId) => {
    const domain = domains[domainId as keyof typeof domains];
    return domain?.challenges.map(challenge => ({
      ...challenge,
      id: challenge.id.toString()
    })) || [];
  },

  fetchPosts: async (domain) => {
    set({ loading: true, error: null });
    try {
      const posts = await api.getPosts(domain);
      set({ posts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },

  toggleLike: (postId) => {
    set((state) => {
      const newLikedPosts = new Set(state.likedPosts);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return { likedPosts: newLikedPosts };
    });
  },

  toggleSave: (postId) => {
    set((state) => {
      const newSavedPosts = new Set(state.savedPosts);
      if (newSavedPosts.has(postId)) {
        newSavedPosts.delete(postId);
      } else {
        newSavedPosts.add(postId);
      }
      return { savedPosts: newSavedPosts };
    });
  },

  sendMessage: (content: string, domain: string) => {
    const { currentDiscussion, discussions } = get();
    if (!currentDiscussion) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      user: getRandomUser(),
      content,
      created_at: new Date().toISOString()
    };

    const updatedDiscussion = {
      ...currentDiscussion,
      messages: [...currentDiscussion.messages, newMessage],
      participants: new Set([...currentDiscussion.messages.map(m => m.user.username), newMessage.user.username]).size
    };

    set({
      currentDiscussion: updatedDiscussion,
      discussions: discussions.map(d => 
        d.id === currentDiscussion.id ? updatedDiscussion : d
      )
    });
  },

  createDiscussion: (title: string, domain: string) => {
    const newDiscussion: Discussion = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      domain,
      messages: [],
      participants: 0
    };

    set(state => ({
      discussions: [...state.discussions, newDiscussion],
      currentDiscussion: newDiscussion
    }));
  },

  setCurrentDiscussion: (discussion: Discussion | null) => {
    set({ currentDiscussion: discussion });
  },

  createPost: async (post) => {
    set({ loading: true, error: null });
    try {
      const newPost = await api.createPost(post);
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create post', loading: false });
    }
  }
}));