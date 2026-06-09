"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, increment } from "firebase/firestore";
import { auth, db, ADMIN_EMAILS } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isAdmin: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);

      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          const isNew = !snap.exists();

          await setDoc(
            ref,
            {
              uid: u.uid,
              displayName: u.displayName,
              email: u.email,
              photoURL: u.photoURL,
              lastLogin: serverTimestamp(),
              loginCount: increment(1),
              ...(isNew && { firstLogin: serverTimestamp(), banned: false }),
            },
            { merge: true }
          );
        } catch {
          // Firestore not yet enabled or network error — silently ignore
        }
      }
    });
    return unsubscribe;
  }, []);

  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
