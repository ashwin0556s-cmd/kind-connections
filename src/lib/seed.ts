import { User, Post, Comment } from "./store";

const USERS_KEY = 'kh_users';
const POSTS_KEY = 'kh_posts';
const COMMENTS_KEY = 'kh_comments';
const LIKES_KEY = 'kh_likes';

export function seedSampleData() {
  // Only seed if no data exists
  if (localStorage.getItem(POSTS_KEY)) return;

  const users: (User & { password: string })[] = [
    {
      uid: "user-001",
      name: "Ashwin Kumar",
      email: "ashwin@example.com",
      password: "password123",
      username: "user4821",
      postCount: 3,
      commentCount: 2,
      totalLikesReceived: 7,
      createdAt: "2026-01-15T10:30:00Z",
      lastLogin: "2026-03-21T08:00:00Z",
    },
    {
      uid: "user-002",
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "password123",
      username: "user7293",
      postCount: 2,
      commentCount: 3,
      totalLikesReceived: 5,
      createdAt: "2026-02-01T14:00:00Z",
      lastLogin: "2026-03-20T19:00:00Z",
    },
    {
      uid: "user-003",
      name: "Ravi Patel",
      email: "ravi@example.com",
      password: "password123",
      username: "user1056",
      postCount: 1,
      commentCount: 1,
      totalLikesReceived: 3,
      createdAt: "2026-02-20T09:15:00Z",
      lastLogin: "2026-03-19T12:00:00Z",
    },
  ];

  const posts: Post[] = [
    {
      id: "post-001",
      userId: "user-001",
      userName: "Ashwin Kumar",
      title: "What's the best way to learn React in 2026?",
      content: "What's the best way to learn React in 2026?\nI've been working with vanilla JS for a while and want to transition. Any recommended courses or project ideas?",
      likeCount: 4,
      createdAt: "2026-03-18T10:00:00Z",
    },
    {
      id: "post-002",
      userId: "user-002",
      userName: "Priya Sharma",
      title: "Tips for preparing for technical interviews",
      content: "Tips for preparing for technical interviews\nI have interviews coming up at several companies. What topics should I focus on? Data structures, system design, or behavioral questions?",
      likeCount: 3,
      createdAt: "2026-03-19T15:30:00Z",
    },
    {
      id: "post-003",
      userId: "user-001",
      userName: "Ashwin Kumar",
      title: "Built my first full-stack project!",
      content: "Built my first full-stack project!\nJust finished building a forum app with Firebase auth and Firestore. It was a great learning experience. Happy to share the code!",
      likeCount: 2,
      createdAt: "2026-03-20T08:45:00Z",
    },
    {
      id: "post-004",
      userId: "user-003",
      userName: "Ravi Patel",
      title: "Thoughts on TypeScript vs JavaScript?",
      content: "Thoughts on TypeScript vs JavaScript?\nIs TypeScript worth the extra setup? I'm starting a new project and can't decide. Would love to hear your experiences.",
      likeCount: 3,
      createdAt: "2026-03-20T14:20:00Z",
    },
    {
      id: "post-005",
      userId: "user-002",
      userName: "Priya Sharma",
      title: "Free resources for learning system design",
      content: "Free resources for learning system design\nHere are some great free resources I found: System Design Primer on GitHub, Gaurav Sen's YouTube channel, and the Designing Data-Intensive Applications book.",
      likeCount: 2,
      createdAt: "2026-03-21T06:00:00Z",
    },
    {
      id: "post-006",
      userId: "user-001",
      userName: "Ashwin Kumar",
      title: "How do you stay motivated while coding?",
      content: "How do you stay motivated while coding?\nSome days I feel super productive, others I can barely write a line. What keeps you going?",
      likeCount: 1,
      createdAt: "2026-03-21T07:30:00Z",
    },
  ];

  const comments: Comment[] = [
    {
      id: "comment-001",
      postId: "post-001",
      userId: "user-002",
      userName: "Priya Sharma",
      text: "I'd recommend starting with the official React docs — they have an amazing interactive tutorial now!",
      createdAt: "2026-03-18T11:00:00Z",
    },
    {
      id: "comment-002",
      postId: "post-001",
      userId: "user-003",
      userName: "Ravi Patel",
      text: "Build projects! That's how I learned. Start with a to-do app, then something more complex.",
      createdAt: "2026-03-18T12:30:00Z",
    },
    {
      id: "comment-003",
      postId: "post-002",
      userId: "user-001",
      userName: "Ashwin Kumar",
      text: "LeetCode for DS&A, and practice explaining your thought process out loud. It really helps!",
      createdAt: "2026-03-19T16:00:00Z",
    },
    {
      id: "comment-004",
      postId: "post-003",
      userId: "user-002",
      userName: "Priya Sharma",
      text: "That's awesome, congrats! Would love to see the code.",
      createdAt: "2026-03-20T09:15:00Z",
    },
    {
      id: "comment-005",
      postId: "post-004",
      userId: "user-001",
      userName: "Ashwin Kumar",
      text: "TypeScript all the way. The autocomplete and error catching save so much time.",
      createdAt: "2026-03-20T15:00:00Z",
    },
    {
      id: "comment-006",
      postId: "post-004",
      userId: "user-002",
      userName: "Priya Sharma",
      text: "Start with JS, switch to TS once you're comfortable. The transition is smooth.",
      createdAt: "2026-03-20T16:30:00Z",
    },
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  localStorage.setItem(LIKES_KEY, JSON.stringify([]));
}
