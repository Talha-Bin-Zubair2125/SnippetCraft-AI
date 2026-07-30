import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Auth_Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiArrowLeft,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import "../styles/Update_Profile.css";
export default function Update_Profile() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetching(true);
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          { withCredentials: true },
        );
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch user data");
        setTimeout(() => setError(""), 3000);
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, []);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/update-profile",
        { username, email, password },
        { withCredentials: true },
      );
      setUser(response.data.user);
      setSuccess(response.data.message || "Profile updated successfully");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };
  if (fetching) {
    return (
      <div className="update-loading">
        <FiLoader className="spin" />
        Loading profile...
      </div>
    );
  }
  return (
    <div className="update-page">
      <div className="update-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {error && (
        <div className="update-message error">
          <FiAlertCircle />
          {error}
        </div>
      )}
      {success && (
        <div className="update-message success">
          <FiCheckCircle />
          {success}
        </div>
      )}
      <div className="update-container glass">
        <div className="update-header">
          <div>
            <h1>
              <FiUser />
              Update Profile
            </h1>
            <p>Manage your account information and credentials.</p>
          </div>
        </div>
        <form onSubmit={handleUpdateProfile}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button className="update-btn" disabled={loading}>
              {loading ? <FiLoader className="spin" /> : <FiSave />}
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Back To Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
