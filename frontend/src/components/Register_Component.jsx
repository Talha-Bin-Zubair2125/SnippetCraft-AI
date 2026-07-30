import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/Auth_Context";
import axios from "axios";
import "../styles/Register.css";

export default function Register_Component() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { setisAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { username, email, password },
        { withCredentials: true },
      );

      setSuccess(response.data.message || "Registration successful");

      setTimeout(() => {
        setisAuthenticated(true);
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="left-side">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="content">
          <h1>
            AI Code Review
            <br />& Snippet Manager
          </h1>
          <p>
            Create your account and unlock an AI-powered development experience.
            Review code instantly, save reusable snippets, detect bugs, improve
            performance, and manage your coding workflow in one modern
            workspace.
          </p>
          <div className="features">
            <div className="feature">
              <h3>🤖 AI Reviews</h3>
              <p>
                Receive intelligent feedback and code optimization suggestions.
              </p>
            </div>
            <div className="feature">
              <h3>📚 Snippet Library</h3>
              <p>Store and organize reusable code snippets securely.</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure Authentication</h3>
              <p>Protected accounts using JWT and secure cookies.</p>
            </div>
            <div className="feature">
              <h3>⚡ Faster Development</h3>
              <p>Improve productivity with AI-assisted coding tools.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Create Account 🚀</h2>
          <p>Start your AI-powered coding journey today.</p>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="loader"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="signin-link">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
