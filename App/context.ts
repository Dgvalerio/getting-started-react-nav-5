import { createContext } from 'react';

const AuthContext = createContext<{
  signOut: () => void | null;
  signIn: () => void | null;
  signUp: () => void | null;
}>({
  signOut: () => null,
  signIn: () => null,
  signUp: () => null,
});

export default AuthContext;
