import React, { useState, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (email, password) => Promise.resolve(undefined),
  signup: (person, Type) => Promise.resolve(undefined),
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
    return storedAuth ? JSON.parse(storedAuth) : true;
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
      if (res.status >= 200 && res.status <= 300) {
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

  const signup = async (person, Type) => {
    if (Type === "user") {
      try {
        const response = await axios.post(
          "https://bl44wdcn-8000.euw.devtunnels.ms/API/signup",
          {
            "person": person,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("response data: ", response.data);

        const { person: userData, token } = response.data;

        setUser(userData);
        setIsAuthenticated(true);
        setAccessToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "1");

        console.log("user: ", userData);
        console.log("token: ", token);
        console.log("auth: ", isAuthenticated);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return "Invalid email or password, please try again";
        } else {
          return "Something went wrong";
        }
      }
    } else if (Type === "employee") {
      const { driving_license, ...dataToCopy } = person; // Exclude driving_license

      try {
        const response = await axios.post(
          "https://bl44wdcn-8000.euw.devtunnels.ms/API/signemployer",
          {
            person: dataToCopy,
            driving_license: person.driving_license,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response data: ", response.data);
        console.log("an employer is registered");

        const { person: userData, token } = response.data;

        if (response.status >= 200 && response.status < 300) {
          console.log("Employer registration successful");

          setUser(userData);
          setIsAuthenticated(true);
          setAccessToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("isAuthenticated", "1");

          console.log("user: ", userData);
          console.log("token: ", token);
          console.log("auth: ", isAuthenticated);
        }
      } catch (error) {
        console.error("Error during employer registration:", error);
        if (error.response && error.response.status === 400) {
          return "Invalid data provided, please check the input.";
        } else {
          return "Something went wrong during employer registration";
        }
      }
    } else {
      throw new Error("Unknown Type provided");
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
