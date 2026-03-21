// localStorage-based state management (placeholder for Firebase)

export interface User {
  uid: string;
  name: string;
  email: string;
  username: string;
  postCount: number;
  commentCount: number;
  totalLikesReceived: number;
  createdAt: string;
  lastLogin: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

const USERS_KEY = 'kh_users';
const POSTS_KEY = 'kh_posts';
const COMMENTS_KEY = 'kh_comments';
const LIKES_KEY = 'kh_likes';
const AUTH_KEY = 'kh_current_user';

function getStore<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Auth
export function getCurrentUser(): User | null {
  try {
    const uid = localStorage.getItem(AUTH_KEY);
    if (!uid) return null;
    return getStore<User>(USERS_KEY).find(u => u.uid === uid) || null;
  } catch { return null; }
}

export function signup(name: string, email: string, password: string): User {
  const users = getStore<User & { password: string }>(USERS_KEY);
  if (users.find(u => u.email === email)) throw new Error('Email already in use');

  const user: User & { password: string } = {
    uid: crypto.randomUUID(),
    name,
    email,
    password,
    username: 'user' + Math.floor(Math.random() * 10000),
    postCount: 0,
    commentCount: 0,
    totalLikesReceived: 0,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };
  users.push(user);
  setStore(USERS_KEY, users);
  localStorage.setItem(AUTH_KEY, user.uid);
  return user;
}

export function login(email: string, password: string): User {
  const users = getStore<User & { password: string }>(USERS_KEY);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  user.lastLogin = new Date().toISOString();
  setStore(USERS_KEY, users);
  localStorage.setItem(AUTH_KEY, user.uid);
  return user;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

// Posts
export function getPosts(): Post[] {
  return getStore<Post>(POSTS_KEY).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUserPosts(userId: string): Post[] {
  return getPosts().filter(p => p.userId === userId);
}

export function createPost(content: string): Post {
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const posts = getStore<Post>(POSTS_KEY);
  const lines = content.split('\n');
  const title = lines[0].length > 60 ? lines[0].substring(0, 60) + '...' : lines[0];
  const post: Post = {
    id: crypto.randomUUID(),
    userId: user.uid,
    userName: user.name,
    title,
    content,
    likeCount: 0,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  setStore(POSTS_KEY, posts);

  // Update user post count
  const users = getStore<User>(USERS_KEY);
  const u = users.find(x => x.uid === user.uid);
  if (u) { u.postCount++; setStore(USERS_KEY, users); }

  return post;
}

export function deletePost(postId: string) {
  const user = getCurrentUser();
  if (!user) return;
  let posts = getStore<Post>(POSTS_KEY);
  posts = posts.filter(p => !(p.id === postId && p.userId === user.uid));
  setStore(POSTS_KEY, posts);
}

export function likePost(postId: string) {
  const user = getCurrentUser();
  if (!user) return;
  const likes = getStore<string>(LIKES_KEY);
  const key = `${user.uid}_${postId}`;
  if (likes.includes(key)) return;
  likes.push(key);
  setStore(LIKES_KEY, likes);

  const posts = getStore<Post>(POSTS_KEY);
  const post = posts.find(p => p.id === postId);
  if (post) { post.likeCount++; setStore(POSTS_KEY, posts); }
}

export function hasLiked(postId: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  return getStore<string>(LIKES_KEY).includes(`${user.uid}_${postId}`);
}

// Comments
export function getComments(postId: string): Comment[] {
  return getStore<Comment>(COMMENTS_KEY)
    .filter(c => c.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function addComment(postId: string, text: string): Comment {
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  const comments = getStore<Comment>(COMMENTS_KEY);
  const comment: Comment = {
    id: crypto.randomUUID(),
    postId,
    userId: user.uid,
    userName: user.name,
    text,
    createdAt: new Date().toISOString(),
  };
  comments.push(comment);
  setStore(COMMENTS_KEY, comments);
  return comment;
}
