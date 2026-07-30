import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";

import {
  FiCode,
  FiEye,
  FiEdit3,
  FiTrash2,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiArrowLeft,
  FiLoader,
} from "react-icons/fi";

import "../styles/Saved_Snippets.css";

export default function Saved_Snippets() {
  const navigate = useNavigate();

  const [savedSnippets, setSavedSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:3000/api/editor/snippets",
          {
            withCredentials: true,
          },
        );

        setSavedSnippets(res.data.snippets);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch snippets");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/editor/delete-snippet/${id}`,
        {
          withCredentials: true,
        },
      );

      setSavedSnippets((prev) => prev.filter((item) => item._id !== id));
      showSuccess("Snippet deleted successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete snippet");
    }
  };

  return (
    <div className="saved-page">
      <div className="saved-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <header className="saved-header glass">
        <div>
          <h1>Saved Snippets</h1>
          <p>View, edit and manage your code collection.</p>
        </div>
        <button
          className="create-btn"
          onClick={() => navigate("/create-snippet")}
        >
          <FiCode />
          Create Snippet
        </button>
      </header>
      {loading && (
        <div className="loading-box glass">
          <FiLoader className="spin" />
          Loading snippets...
        </div>
      )}
      {error && (
        <div className="message error">
          <FiAlertCircle />
          {error}
        </div>
      )}
      {success && (
        <div className="message success">
          <FiCheckCircle />
          {success}
        </div>
      )}
      {savedSnippets.length === 0 && !loading ? (
        <div className="empty-box glass">
          <FiCode />
          <h2>No Saved Snippets</h2>
          <p>Create your first snippet to start your collection.</p>
        </div>
      ) : (
        <section className="snippet-grid">
          {savedSnippets.map((snippet) => (
            <div className="snippet-card glass" key={snippet._id}>
              <div className="snippet-top">
                <div className="snippet-icon">
                  <FiCode />
                </div>
                <span className="language">{snippet.language}</span>
              </div>
              <h2>{snippet.title}</h2>
              <div className="snippet-info">
                <p>
                  <FiCalendar />
                  {new Date(snippet.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="snippet-actions">
                <button
                  className="view"
                  onClick={() => setSelectedSnippet(snippet)}
                >
                  <FiEye />
                  View
                </button>
                <button
                  className="edit"
                  onClick={() => navigate(`/edit-snippet/${snippet._id}`)}
                >
                  <FiEdit3 />
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteSnippet(snippet._id)}
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
      {selectedSnippet && (
        <div className="snippet-modal-overlay">
          <div className="snippet-modal glass">
            <div className="modal-header">
              <div>
                <h2>{selectedSnippet.title}</h2>
                <span>{selectedSnippet.language}</span>
              </div>
              <button
                className="close-btn"
                onClick={() => setSelectedSnippet(null)}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-date">
              <FiCalendar />
              {new Date(selectedSnippet.createdAt).toLocaleString()}
            </div>
            <div className="modal-editor">
              <Editor
                height="450px"
                language={selectedSnippet.language}
                theme="vs-dark"
                value={selectedSnippet.code}
                options={{
                  readOnly: true,
                  minimap: {
                    enabled: false,
                  },
                  fontSize: 14,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>
      )}
      <button className="back-btn" onClick={() => navigate("/profile")}>
        <FiArrowLeft />
        Back to Dashboard
      </button>
    </div>
  );
}
