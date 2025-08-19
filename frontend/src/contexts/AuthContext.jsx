import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function login(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }
  function logout() {
    localStorage.removeItem("token");
    setToken("");
  }
  const value = {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
