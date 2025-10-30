import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return <AuthContext.Provider value={{loading,login,logout,user}}>{children}</AuthContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);