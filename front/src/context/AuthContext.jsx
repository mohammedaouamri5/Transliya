import React, { useState, useContext, createContext } from "react";
import axios from "axios";


const AuthContext = createContext({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (username, password) => Promise.resolve(undefined),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [accessToken, setAccessToken] = useState(() => {
    const storedAccessToken = localStorage.getItem("access-token");
    return storedAccessToken ? storedAccessToken : null;
  });

  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "https://pbc34zvg-8000.euw.devtunnels.ms/auth/token/login/",
        {
          username,
          password,
        }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setAccessToken(res.data["access-token"]);
        localStorage.setItem("access-token", res.data["access-token"]);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isAuthenticated", "1");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return "Invalid username or password, please try again";
      } else {
        return "Something went wrong";
      }
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
