import { db } from "./firebase";
import { ref, set } from "firebase/database";

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
    await set(ref(db, `analytics/visitors/${id}`), true);
  } catch (e) {
    console.warn("registerVisitor failed", e);
  }
}
