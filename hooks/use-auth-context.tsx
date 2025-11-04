import { insertUserData } from "@/lib/data";
import { auth } from "@/lib/firebase.config";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppState } from "react-native";

type AuthContextType = {
  user: User | null;
  isVerified: boolean | null;
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error: FirebaseError | null;
  }>;
  signup: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error: FirebaseError | null;
  }>;
  handleResendVerification: () => Promise<void>;
  logout: () => Promise<void>;
};

const authContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      return { success: true, error: null };
    } catch (error: FirebaseError | any) {
      return { success: false, error };
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await insertUserData(userCredential.user.uid, {
        email: userCredential.user.email,
      });

      await sendEmailVerification(userCredential.user);

      return { success: true, error: null };
    } catch (error: FirebaseError | any) {
      return { success: false, error };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error: FirebaseError | any) {
      console.log(error);
    }
  }, []);

  const handleResendVerification = useCallback(async () => {
    try {
      if (user) {
        await sendEmailVerification(user);
      }
    } catch (error: FirebaseError | any) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsVerified(user.emailVerified);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, setIsVerified]);

  useEffect(() => {
    AppState.addEventListener("change", (nextAppState: any) => {
      if (nextAppState === "active" && auth.currentUser) {
        auth.currentUser
          .reload()
          .then(() => {
            setIsVerified(auth.currentUser?.emailVerified ?? false);
          })
          .catch((error) => {
            console.log("Error reloading user:", error);
          });
      }
    });
  }, [setIsVerified]);

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isVerified,
        handleResendVerification,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
