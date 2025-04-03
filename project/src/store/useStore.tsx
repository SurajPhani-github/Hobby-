import { create } from 'zustand';
import { domains } from '../data/domains';

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar_url?: string;
  phone?: string;
  department?: string;
  year?: string;
  rollNo?: string;
  dob?: string;
}

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

interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: string;
  participants: number;
}

interface ChallengeRegistration {
  id: string;
  userId: string;
  challengeId: string;
  name: string;
  email: string;
  department: string;
  year: string;
  rollNo: string;
  motivation: string;
  experience: string;
  registrationDate: string;
}

interface Store {
  posts: Post[];
  likedPosts: Set<string>;
  savedPosts: Set<string>;
  discussions: Discussion[];
  currentDiscussion: Discussion | null;
  challenges: Challenge[];
  loading: boolean;
  user: User | null;
  users: User[];
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
  user: null,
  users: [],
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

  fetchPosts: async (domain?: string) => {
    set({ loading: true });
    try {
      const domainPosts = domain ? get().getDomainPosts(domain) : [];
      set({ posts: domainPosts });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      set({ loading: false });
    }
  },

  toggleLike: (postId: string) => {
    const { likedPosts, posts } = get();
    const newLikedPosts = new Set(likedPosts);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) return;

    const updatedPosts = [...posts];
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes: Math.max(0, updatedPosts[postIndex].likes - 1)
      };
    } else {
      newLikedPosts.add(postId);
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        likes: updatedPosts[postIndex].likes + 1
      };
    }

    set({ likedPosts: newLikedPosts, posts: updatedPosts });
  },

  toggleSave: (postId: string) => {
    const { savedPosts } = get();
    const newSavedPosts = new Set(savedPosts);

    if (savedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }

    set({ savedPosts: newSavedPosts });
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
  }
}));