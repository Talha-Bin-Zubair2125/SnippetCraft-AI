import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/Auth_Context";
import axios from "axios";
import "../styles/Login.css";

function Login_Component() {
  const { setisAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      setSuccess(response.data.message || "Login successful");

      setTimeout(() => {
        setisAuthenticated(true);
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="content">
          <h1>
            AI Code Review
            <br />& Snippet Manager
          </h1>
          <p>
            Review code intelligently using Artificial Intelligence, detect
            bugs, improve performance, store reusable snippets, and organize
            your coding workflow from one modern platform.
          </p>
          <div className="features">
            <div className="feature">
              <h3>🚀 AI Reviews</h3>
              <p>Receive intelligent suggestions and optimized code.</p>
            </div>
            <div className="feature">
              <h3>⚡ Snippet Library</h3>
              <p>Save and organize your favorite code snippets.</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure Login</h3>
              <p>Authentication powered with JWT and Cookies.</p>
            </div>
            <div className="feature">
              <h3>💻 Multi Language</h3>
              <p>JavaScript, Python, C++, Java and many more.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Welcome Back 👋</h2>
          <p>Login to continue your coding journey.</p>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="signup-link">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login_Component;
