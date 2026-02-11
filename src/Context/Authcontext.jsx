import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // ✅ SAVE HERE
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); // ✅ REMOVE ON LOGOUT
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
