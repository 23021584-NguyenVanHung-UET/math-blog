"use client";

import { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface PostMeta {
  title: string;
  date: string;
  category: string;
  summary: string;
}

export function useBookmark(slug: string, postMeta: PostMeta) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const ref = doc(db, "bookmarks", user.uid, "posts", slug);
    const unsub = onSnapshot(ref, (snap) => {
      setBookmarked(snap.exists());
      setLoading(false);
    });
    return unsub;
  }, [user, slug]);

  async function toggle() {
    if (!user) return;
    const ref = doc(db, "bookmarks", user.uid, "posts", slug);
    if (bookmarked) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, { slug, ...postMeta, savedAt: serverTimestamp() });
    }
  }

  return { bookmarked, toggle, loading };
}
