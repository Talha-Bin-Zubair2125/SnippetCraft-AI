import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth_Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiBookOpen,
  FiCpu,
  FiZap,
  FiCode,
  FiFileText,
  FiEdit,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import "../styles/Profile.css";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [savedSnippetsCount, setSavedSnippetsCount] = useState(0);
  const [totalAiReviews, setTotalAiReviews] = useState(0);

  const [codeQuality, setCodeQuality] = useState({
    score: 0,
    grade: "N/A",
    readability: { score: 0, feedback: "" },
    maintainability: { score: 0, feedback: "" },
    performance: { score: 0, feedback: "" },
    bestPractices: { score: 0, feedback: "" },
  });

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true },
      );

      setSuccess("Logged out successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snippets = await axios.get(
          "http://localhost:3000/api/editor/snippets",
          {
            withCredentials: true,
          },
        );

        setSavedSnippetsCount(snippets.data.snippets?.length || 0);

        const reviews = await axios.get(
          "http://localhost:3000/api/editor/total-ai-reviews",
          {
            withCredentials: true,
          },
        );

        setTotalAiReviews(reviews.data.totalReviews || 0);

        const quality = await axios.get(
          "http://localhost:3000/api/editor/all-ai-reviews",
          {
            withCredentials: true,
          },
        );

        if (quality.data.reviews?.length) {
          setCodeQuality(
            quality.data.reviews[0].aiReview?.codeQuality || codeQuality
          );
        }
      } catch (err) {
        setError("Failed to load profile data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <header className="profile-header glass">
        <div>
          <h1>Welcome Back, {user?.username || "Developer"} 👋</h1>
          <p>Manage your AI reviews, saved snippets, and coding progress.</p>
        </div>
        <div className="profile-user">
          <div className="avatar">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h3>{user?.username || "User"}</h3>
            <p>{user?.email || "developer@example.com"}</p>
          </div>
        </div>
      </header>
      <section className="stats">
        <div className="stat-card glass">
          <FiBookOpen />
          <h2>{savedSnippetsCount}</h2>
          <p>Saved Snippets</p>
        </div>
        <div className="stat-card glass">
          <FiCpu />
          <h2>{totalAiReviews}</h2>
          <p>AI Reviews</p>
        </div>
        <div className="stat-card glass">
          <FiZap />
          <h2>{codeQuality.score || 0}%</h2>
          <p>Code Quality</p>
        </div>
      </section>
      <section className="quality-section glass">
        <div className="quality-header">
          <h2>
            <FiCode />
            Code Quality Report
          </h2>
          <span className="grade-pill">Grade: {codeQuality.grade || "N/A"}</span>
        </div>
        <div className="quality-content">
          <div
            className="score-circle"
            style={{
              background: `conic-gradient(#6366f1 ${
                (codeQuality.score || 0) * 3.6
              }deg, #334155 0deg)`,
            }}
          >
            <div>
              <h1>{codeQuality.score || 0}%</h1>
              <p>Score</p>
            </div>
          </div>
          <div className="quality-details">
            {[
              ["Readability", codeQuality.readability],
              ["Maintainability", codeQuality.maintainability],
              ["Performance", codeQuality.performance],
              ["Best Practices", codeQuality.bestPractices],
            ].map(([title, data]) => (
              <div className="quality-item" key={title}>
                <div className="quality-item-header">
                  <h4>{title}</h4>
                  <span>{(data?.score || 0)} / 10</span>
                </div>
                <div className="progress">
                  <div
                    style={{
                      width: `${(data?.score || 0) * 10}%`,
                    }}
                  ></div>
                </div>
                <p>{data?.feedback || "No feedback available."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="quick-actions glass">
        <h2>Quick Actions</h2>
        <div className="actions">
          <button onClick={() => navigate("/create-snippet")}>
            <FiCode />
            Create Snippet
          </button>
          <button onClick={() => navigate("/snippets")}>
            <FiFileText />
            Saved Snippets
          </button>
          <button onClick={() => navigate("/update-profile")}>
            <FiEdit />
            Update Profile
          </button>
        </div>
      </section>
      <button className="logout-btn" onClick={handleLogout} disabled={loading}>
        <FiLogOut />
        {loading ? "Logging Out..." : "Logout"}
      </button>
      {error && (
        <div className="message error">
          <FiAlertCircle />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="message success">
          <FiCheckCircle />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
}