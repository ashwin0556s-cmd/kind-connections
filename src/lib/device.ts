import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const KEY = "kh_device_id";

export function getDeviceId(): string {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export async function registerVisitor() {
  const id = getDeviceId();
  try {
    await setDoc(
      doc(db, "visitors", id),
      { lastSeen: serverTimestamp() },
      { merge: true }
    );
  } catch (e) {
    console.warn("registerVisitor failed", e);
  }
}
