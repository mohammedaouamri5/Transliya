import React, { useState, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (email, password) => Promise.resolve(undefined),
  signup: (formData, Type) => Promise.resolve(undefined),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? "" : null;
    // JSON.parse(storedUser) ?
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [accessToken, setAccessToken] = useState(() => {
    const storedAccessToken = localStorage.getItem("access-token");
    return storedAccessToken ? storedAccessToken : null;
  });

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://bl44wdcn-8000.euw.devtunnels.ms/API/login",
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setAccessToken(res.data["token"]);
        localStorage.setItem("token", res.data["token"]);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isAuthenticated", "1");
        console.log("user: ", user);
        console.log("token: ", res.data["token"]);
        console.log("auth: ", isAuthenticated);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return "Invalid email or password, please try again";
      } else {
        return "Something went wrong";
      }
    }
  };

  const signup = async (formData, Type) => {
    console.log("type: ", Type);
    try {
      const res = await axios.post(
        "https://bl44wdcn-8000.euw.devtunnels.ms/API/signup",
        {
          ...formData,
          driving_license: undefined,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // setUser(res.data.person);
      console.log(res.data)
      setIsAuthenticated(true);
      setAccessToken(res.data["token"]);
      localStorage.setItem("token", res.data["token"]);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isAuthenticated", "1");
      console.log("user: ", user);
      console.log("token: ", res.data["token"]);
      console.log("auth: ", isAuthenticated);

      if (Type === "employee") {
        const token = localStorage.getItem(token);
        const user = localStorage.getItem(user);
        const id = user.id;
        const driving_license = formData.driving_license;

        try {
          const response = axios.post(
            "https://bl44wdcn-8000.euw.devtunnels.ms/API/create_employer",
            {
              driving_license,
              id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`,
              },
            }
          );

          if (response.status === 200) {
            console.log("an employer is registered");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return "Invalid email or password, please try again";
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
      value={{ user, accessToken, isAuthenticated, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
