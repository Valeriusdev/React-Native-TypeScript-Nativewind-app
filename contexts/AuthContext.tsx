import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = { email: string };

type Session = { user: User };

type AuthContextValue = {
  session: Session | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const SESSION_KEY = "session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await SecureStore.getItemAsync(SESSION_KEY);

      if (!storedSession) {
        return;
      }

      setSession(JSON.parse(storedSession));
    };

    void loadSession();
  }, []);

  const login = async (email: string) => {
    const nextSession = { user: { email } };

    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setSession(null);
  };

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}