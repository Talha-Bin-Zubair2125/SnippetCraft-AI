import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);


// Creating a custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile", {withCredentials:true}
        );
        setUser(response.data);
        setisAuthenticated(true);
        setSuccess("Profile fetched successfully" || response.data.message);
      } catch (error) {
        setError("Error Fetching User Data" || response.data.message);
      }
    };
    fetchUserData();
  }, []);

  const data = {
    user,
    setUser,
    isAuthenticated,
    setisAuthenticated,
    success,
    setSuccess,
    error,
    setError,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
