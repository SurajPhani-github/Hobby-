import { Code, Palette, Music, Dumbbell, Camera, PenTool } from 'lucide-react';

export const domains = {
  programming: {
    id: 'programming',
    icon: Code,
    name: 'Programming',
    color: 'bg-blue-500',
    description: 'Learn and master programming concepts, share projects, and connect with fellow developers.',
    banner: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
    stats: {
      members: 2453,
      posts: 1234,
      discussions: 456
    },
    posts: [
      {
        id: 1,
        user: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'
        },
        content: {
          text: 'Just completed my first full-stack project! Built with React and Node.js 🚀',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'
        },
        likes: 127,
        comments: 23,
        timestamp: '1h'
      }
    ],
    challenges: [
      {
        id: 1,
        title: '30 Days of Code',
        description: 'Complete daily coding challenges for 30 days',
        participants: 234,
        deadline: '2024-04-01'
      }
    ]
  },
  design: {
    id: 'design',
    icon: Palette,
    name: 'Design',
    color: 'bg-purple-500',
    description: 'Explore UI/UX design, graphic design, and visual storytelling.',
    banner: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200',
    stats: {
      members: 1892,
      posts: 943,
      discussions: 234
    },
    posts: [
      {
        id: 1,
        user: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
        },
        content: {
          text: 'New portfolio design concept. What do you think?',
          image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600'
        },
        likes: 245,
        comments: 42,
        timestamp: '2h'
      }
    ],
    challenges: [
      {
        id: 1,
        title: 'Daily UI Challenge',
        description: 'Create a unique UI design every day for 100 days',
        participants: 156,
        deadline: '2024-05-01'
      }
    ]
  },
  music: {
    id: 'music',
    icon: Music,
    name: 'Music',
    color: 'bg-pink-500',
    description: 'Share your musical journey, learn instruments, and collaborate with others.',
    banner: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200',
    stats: {
      members: 1567,
      posts: 876,
      discussions: 321
    },
    posts: [
      {
        id: 1,
        user: {
          name: 'Alex Rivera',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        },
        content: {
          text: 'Finally mastered this guitar solo! Check it out 🎸',
          image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600'
        },
        likes: 178,
        comments: 34,
        timestamp: '3h'
      }
    ],
    challenges: [
      {
        id: 1,
        title: 'Song Writing Challenge',
        description: 'Write and record an original song in 7 days',
        participants: 89,
        deadline: '2024-03-30'
      }
    ]
  },
  fitness: {
    id: 'fitness',
    icon: Dumbbell,
    name: 'Fitness',
    color: 'bg-green-500',
    description: 'Achieve your fitness goals, share workouts, and stay motivated together.',
    banner: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200',
    stats: {
      members: 2134,
      posts: 1432,
      discussions: 567
    },
    posts: [
      {
        id: 1,
        user: {
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150'
        },
        content: {
          text: 'New PR on deadlifts! Consistency is key 💪',
          image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600'
        },
        likes: 312,
        comments: 45,
        timestamp: '4h'
      }
    ],
    challenges: [
      {
        id: 1,
        title: '30-Day HIIT Challenge',
        description: 'Complete daily HIIT workouts for maximum results',
        participants: 423,
        deadline: '2024-04-15'
      }
    ]
  },
  photography: {
    id: 'photography',
    icon: Camera,
    name: 'Photography',
    color: 'bg-amber-500',
    description: 'Capture moments, learn photography techniques, and showcase your work.',
    banner: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200',
    stats: {
      members: 1876,
      posts: 2341,
      discussions: 432
    },
    posts: [
      {
        id: 1,
        user: {
          name: 'Emma Taylor',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
        content: {
          text: 'Golden hour magic in the city 📸',
          image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600'
        },
        likes: 456,
        comments: 67,
        timestamp: '5h'
      }
    ],
    challenges: [
      {
        id: 1,
        title: 'Street Photography Challenge',
        description: 'Capture urban life through your lens',
        participants: 234,
        deadline: '2024-04-10'
      }
    ]
  },
  writing: {
    id: 'writing',
    icon: PenTool,
    name: 'Writing',
    color: 'bg-indigo-500',
    description: 'Develop your writing skills, share stories, and get feedback from fellow writers.',
    banner: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200',
    stats: {
      members: 1432,
      posts: 876,
      discussions: 543
    },
    posts: [
      {
        id: 1,
        user: {
          name: 'Lisa Wong',
          avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150'
        },
        content: {
          text: 'Just finished the first draft of my novel! 📚✍️',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600'
        },
        likes: 234,
        comments: 56,
        timestamp: '6h'
      }
    ],
    challenges: [
      {
        id: 1,
        title: 'Flash Fiction Challenge',
        description: 'Write a complete story in exactly 100 words',
        participants: 167,
        deadline: '2024-03-28'
      }
    ]
  }
};

export type Domain = typeof domains[keyof typeof domains];
export type DomainId = keyof typeof domains;