import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  increment,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
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

const tsToMs = (v: any): number => {
  if (!v) return 0;
  if (v instanceof Timestamp) return v.toMillis();
  if (typeof v?.toMillis === "function") return v.toMillis();
  if (typeof v === "number") return v;
  return 0;
};

export async function createPost(content: string) {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Empty post");
  const deviceId = getDeviceId();
  await addDoc(collection(db, "posts"), {
    content: trimmed,
    createdAt: serverTimestamp(),
    deviceId,
    commentCount: 0,
  });
}

export async function addComment(postId: string, content: string) {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("Empty comment");
  const deviceId = getDeviceId();
  await addDoc(collection(db, "comments"), {
    postId,
    content: trimmed,
    createdAt: serverTimestamp(),
    deviceId,
  });
  await updateDoc(doc(db, "posts", postId), {
    commentCount: increment(1),
  });
}

export function subscribePosts(cb: (posts: Post[]) => void) {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const arr: Post[] = snap.docs.map((d) => {
        const v = d.data() as any;
        return {
          id: d.id,
          content: v.content || "",
          createdAt: tsToMs(v.createdAt),
          deviceId: v.deviceId || "",
          commentCount: v.commentCount || 0,
        };
      });
      cb(arr);
    },
    (err) => console.error("subscribePosts error", err)
  );
}

export function subscribeComments(postId: string, cb: (comments: Comment[]) => void) {
  const q = query(collection(db, "comments"), where("postId", "==", postId));
  return onSnapshot(
    q,
    (snap) => {
      const arr: Comment[] = snap.docs.map((d) => {
        const v = d.data() as any;
        return {
          id: d.id,
          postId: v.postId,
          content: v.content || "",
          createdAt: tsToMs(v.createdAt),
          deviceId: v.deviceId || "",
        };
      });
      arr.sort((a, b) => a.createdAt - b.createdAt);
      cb(arr);
    },
    (err) => console.error("subscribeComments error", err)
  );
}

export interface Analytics {
  visitors: number;
  totalPosts: number;
  totalComments: number;
}

export function subscribeAnalytics(cb: (a: Analytics) => void) {
  let visitors = 0;
  let totalPosts = 0;
  let totalComments = 0;
  const emit = () => cb({ visitors, totalPosts, totalComments });

  const u1 = onSnapshot(collection(db, "visitors"), (s) => {
    visitors = s.size;
    emit();
  });
  const u2 = onSnapshot(collection(db, "posts"), (s) => {
    totalPosts = s.size;
    emit();
  });
  const u3 = onSnapshot(collection(db, "comments"), (s) => {
    totalComments = s.size;
    emit();
  });

  return () => {
    u1();
    u2();
    u3();
  };
}
