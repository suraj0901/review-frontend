import { createContext, useContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
  storageKey?: string;
  loginRedirect?: string;
  logoutRedirect?: string;
}

interface AuthProviderState {
  authed: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const initialState: AuthProviderState = {
  authed: false,
  login() {
    return;
  },
  logout() {
    return;
  },
};

const AuthProviderContext = createContext(initialState);

export function AuthProvider({
  children,
  storageKey = "auth-token",
  ...props
}: AuthProviderProps) {
  const [authed, setAuthed] = useState<boolean>(
    () => Boolean(localStorage.getItem(storageKey)) || false
  );

  function login(token: string) {
    localStorage.setItem(storageKey, token);
    setAuthed(true);
  }

  function logout() {
    localStorage.removeItem(storageKey);
    setAuthed(false);
  }

  return (
    <AuthProviderContext.Provider value={{ authed, login, logout }} {...props}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthProviderContext);
}
