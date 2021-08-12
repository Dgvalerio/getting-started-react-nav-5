import React from 'react';

const AuthContext = React.createContext({
  signOut: () => null,
  signIn: () => null,
  signUp: () => null,
});

export default AuthContext;
