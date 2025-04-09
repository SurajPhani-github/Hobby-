export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar_url?: string;
  department?: string;
  year?: string;
  rollNo?: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  domain: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  created_at: string;
  postId: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: string;
  participants: number;
}

export interface ChallengeRegistration {
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