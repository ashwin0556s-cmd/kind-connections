import { db } from "./firebase";
import {
  ref,
  push,
  set,
  onValue,
  runTransaction,
  serverTimestamp,
  query,
  orderByChild,
} from "firebase/database";
import { getDeviceId } from "./device";

export interface Post {
  id: string;
  content: string;
  createdAt: number;
  deviceId: string;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  createdAt: number;
  deviceId: string;
}

export async function createPost(content: string) {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Empty post");
  const deviceId = getDeviceId();
  const postRef = push(ref(db, "posts"));
  await set(postRef, {
    content: trimmed,
    createdAt: serverTimestamp(),
    deviceId,
    commentCount: 0,
  });
  await runTransaction(ref(db, "analytics/totalPosts"), (v) => (v || 0) + 1);
}

export async function addComment(postId: string, content: string) {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Empty comment");
  const deviceId = getDeviceId();
  const cRef = push(ref(db, "comments"));
  await set(cRef, {
    postId,
    content: trimmed,
    createdAt: serverTimestamp(),
    deviceId,
  });
  await runTransaction(ref(db, `posts/${postId}/commentCount`), (v) => (v || 0) + 1);
  await runTransaction(ref(db, "analytics/totalComments"), (v) => (v || 0) + 1);
}

export function subscribePosts(cb: (posts: Post[]) => void) {
  const q = query(ref(db, "posts"), orderByChild("createdAt"));
  return onValue(q, (snap) => {
    const arr: Post[] = [];
    snap.forEach((child) => {
      const v = child.val();
      arr.push({
        id: child.key!,
        content: v.content || "",
        createdAt: v.createdAt || 0,
        deviceId: v.deviceId || "",
        commentCount: v.commentCount || 0,
      });
    });
    arr.sort((a, b) => b.createdAt - a.createdAt);
    cb(arr);
  });
}

export function subscribeComments(postId: string, cb: (comments: Comment[]) => void) {
  return onValue(ref(db, "comments"), (snap) => {
    const arr: Comment[] = [];
    snap.forEach((child) => {
      const v = child.val();
      if (v.postId === postId) {
        arr.push({
          id: child.key!,
          postId: v.postId,
          content: v.content || "",
          createdAt: v.createdAt || 0,
          deviceId: v.deviceId || "",
        });
      }
    });
    arr.sort((a, b) => a.createdAt - b.createdAt);
    cb(arr);
  });
}

export interface Analytics {
  visitors: number;
  totalPosts: number;
  totalComments: number;
}

export function subscribeAnalytics(cb: (a: Analytics) => void) {
  return onValue(ref(db, "analytics"), (snap) => {
    const v = snap.val() || {};
    const visitors = v.visitors ? Object.keys(v.visitors).length : 0;
    cb({
      visitors,
      totalPosts: v.totalPosts || 0,
      totalComments: v.totalComments || 0,
    });
  });
}
