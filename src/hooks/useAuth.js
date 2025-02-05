import { useEffect, useState } from "react";
import { onAuthStateChange } from "../utils/firebase/auth/authApi";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => setUser(user));

    return () => unsubscribe();
  }, []);

  return { user };
}
