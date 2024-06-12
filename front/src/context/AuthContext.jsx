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
    if (formData.password !== formData.confirmPassword) {
      console.log("Signup error: password");
    } else {
      try {
        const response = await fetch(
          "https://bl44wdcn-8000.euw.devtunnels.ms/API/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, driving_license: undefined }), // Exclude driving_license
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Signup successful:", data);

        try {
          setUser(response.data.person);
          setIsAuthenticated(true);
          setAccessToken(res.data["token"]);
          localStorage.setItem("token", response.data["token"]);
          localStorage.setItem(
            "person",
            JSON.stringify(res.data.person)
          );
          localStorage.setItem("isAuthenticated", "1");
          console.log("user: ", res.data.person);
          console.log("token: ", res.data["token"]);
          console.log("auth: ", isAuthenticated);
          const userId = user.id;
          const token = response.data["token"];
        } catch (error) {
          console.error("Error setting user state:", error);
        }

        if (Type === "employee") {
          try {
            const employeeResponse = await fetch(
              "https://bl44wdcn-8000.euw.devtunnels.ms/API/create_employer",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                  driving_license: formData.driving_license,
                  userId,
                }),
              }
            );

            if (employeeResponse.ok) {
              console.log("Employee creation successful");
            } else {
              throw new Error(
                `Error creating employee: ${employeeResponse.statusText}`
              );
            }
          } catch (error) {
            console.error("Error creating employee:", error);
          }
        }
      } catch (error) {
        console.error("Signup failed:", error);
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
