import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  FiCode,
  FiSave,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import "../styles/Edit_Snippet.css";

export default function Edit_Snippet_Component() {
  const { snippetId } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const languages = [
    {
      group: "Web",
      items: [
        ["JavaScript", "javascript"],
        ["TypeScript", "typescript"],
        ["HTML", "html"],
        ["CSS", "css"],
        ["PHP", "php"],
      ],
    },
    {
      group: "Backend",
      items: [
        ["Python", "python"],
        ["Java", "java"],
        ["C", "c"],
        ["C++", "cpp"],
        ["C#", "csharp"],
        ["Go", "go"],
        ["Rust", "rust"],
        ["Ruby", "ruby"],
        ["Swift", "swift"],
        ["Kotlin", "kotlin"],
        ["Dart", "dart"],
      ],
    },
    {
      group: "Database",
      items: [
        ["SQL", "sql"],
        ["JSON", "json"],
        ["XML", "xml"],
        ["Markdown", "markdown"],
      ],
    },
    {
      group: "Shell",
      items: [
        ["Shell", "shell"],
        ["PowerShell", "powershell"],
      ],
    },
  ];

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/editor/snippet/${snippetId}`,
          {
            withCredentials: true,
          },
        );

        setSnippet(res.data.snippet);
      } catch (err) {
        setError("Failed to fetch snippet");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [snippetId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setUpdating(true);
    setError("");

    try {
      await axios.put(
        `http://localhost:3000/api/editor/edit-snippet/${snippetId}`,
        {
          title: snippet.title,
          code: snippet.code,
          language: snippet.language,
        },
        {
          withCredentials: true,
        },
      );

      setSuccess("Snippet updated successfully!");

      setTimeout(() => {
        navigate("/snippets");
      }, 1500);
    } catch (err) {
      setError("Failed to update snippet");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-loading">
        <FiLoader className="spin" />
        Loading snippet...
      </div>
    );
  }

  if (!snippet) return null;

  return (
    <div className="edit-page">
      <div className="edit-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {error && (
        <div className="edit-message error">
          <FiAlertCircle />
          {error}
        </div>
      )}
      {success && (
        <div className="edit-message success">
          <FiCheckCircle />
          {success}
        </div>
      )}
      <div className="edit-container glass">
        <div className="edit-header">
          <div>
            <h1>
              <FiCode />
              Edit Snippet
            </h1>
            <p>Update your code and save changes.</p>
          </div>
          <button className="btn-back" onClick={() => navigate("/snippets")}>
            <FiArrowLeft />
            Back to Snippets
          </button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="field">
            <label>Title</label>
            <input
              value={snippet.title}
              onChange={(e) =>
                setSnippet({
                  ...snippet,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>Language</label>
            <select
              value={snippet.language}
              onChange={(e) =>
                setSnippet({
                  ...snippet,
                  language: e.target.value,
                })
              }
            >
              {languages.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.items.map(([name, value]) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="editor-box">
            <label>Code</label>
            <Editor
              height="450px"
              language={snippet.language}
              theme="vs-dark"
              value={snippet.code}
              onChange={(value) =>
                setSnippet({
                  ...snippet,
                  code: value || "",
                })
              }
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                automaticLayout: true,
                lineNumbers: "on",
                wordWrap: "on",
                formatOnPaste: true,
              }}
            />
          </div>
          <div className="form-buttons">
            <button className="update-btn" disabled={updating}>
              {updating ? <FiLoader className="spin" /> : <FiSave />}
              {updating ? "Updating..." : "Update Snippet"}
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
