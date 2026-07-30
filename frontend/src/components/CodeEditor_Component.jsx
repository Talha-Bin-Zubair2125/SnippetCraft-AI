import React from "react";
import { useState } from "react";
import { useAuth } from "../context/Auth_Context";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import {
  FiCode,
  FiSave,
  FiZap,
  FiChevronDown,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiX,
  FiCpu,
  FiShield,
  FiTrendingUp,
  FiBook,
  FiArrowLeft,
} from "react-icons/fi";
import axios from "axios";
import "../styles/CodeEditor_Component.css";

export default function CodeEditor_Component() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [snippetid, setSnippetId] = useState(null);
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [promptToSave, setPromptToSave] = useState("");
  const [codeQuality, setCodeQuality] = useState(null);

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
        ["Scala", "scala"],
        ["Dart", "dart"],
      ],
    },
    {
      group: "Data & Config",
      items: [
        ["SQL", "sql"],
        ["JSON", "json"],
        ["YAML", "yaml"],
        ["XML", "xml"],
        ["Markdown", "markdown"],
      ],
    },
    {
      group: "Shell",
      items: [
        ["Shell/Bash", "shell"],
        ["PowerShell", "powershell"],
      ],
    },
  ];

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleSaveSnippet = async () => {
    if (!title.trim()) return showError("Please add a title first");
    if (!code.trim()) return showError("Please write some code first");
    setSaving(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/editor/create-snippet",
        { title, code, language },
        { withCredentials: true },
      );
      setSnippetId(res.data.snippet._id);
      showSuccess("Snippet saved successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to save snippet");
    } finally {
      setSaving(false);
    }
  };

  const handleReviewWithAI = async () => {
    if (!code.trim()) return showError("Please write some code first");
    setReviewing(true);
    setAiResult(null);
    setCodeQuality(null);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/editor/review",
        { code, language, snippetId: snippetid },
        { withCredentials: true },
      );
      setAiResult(res.data.review);
      setCodeQuality(res.data.review.codeQuality);
      setPromptToSave(res.data.promptToSave);
    } catch (err) {
      showError(err.response?.data?.message || "AI review failed");
    } finally {
      setReviewing(false);
    }
  };

  const handleSaveCorrectedCode = async () => {
    if (!aiResult?.correctedCode)
      return showError("No corrected code available.");
    const snippetIdToSave = snippetid || aiResult?.snippetId;
    try {
      const res = await axios.put(
        `http://localhost:3000/api/editor/save-corrected-code/${snippetIdToSave}`,
        { correctedCode: aiResult.correctedCode },
        { withCredentials: true },
      );
      console.log("Corrected code saved:", res.data);
      setCode(aiResult.correctedCode);
      setPromptToSave("");
      showSuccess("Corrected code saved to editor!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to save corrected code");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "#4ade80";
    if (score >= 6) return "#fbbf24";
    if (score >= 4) return "#fb923c";
    return "#f87171";
  };

  const getGradeBg = (grade) => {
    if (!grade) return "#6366f1";
    if (grade.startsWith("A")) return "#4ade80";
    if (grade.startsWith("B")) return "#60a5fa";
    if (grade.startsWith("C")) return "#fbbf24";
    return "#f87171";
  };

  return (
    <div className="editor-page">
      <div className="bg-orbs">
        <div className="orb1" />
        <div className="orb2" />
        <div className="orb3" />
      </div>

      <header className="editor-header">
        <div className="header-brand">
          <div className="brand-icon">
            <FiCpu />
          </div>
          <div>
            <h1>AI Code Studio</h1>
            <p>Write · Save · Review · Improve</p>
          </div>
        </div>
        <div className="header-user">
          <div className="user-avatar">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h4>{user?.username || "User"}</h4>
            <span>Developer</span>
          </div>
        </div>
      </header>

      {/* Added inline style to ensure the main content is independently scrollable */}
      <main
        className="editor-main"
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="toolbar glass">
          <input
            className="title-input"
            placeholder="Snippet title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="select-wrapper">
            <select
              className="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <FiChevronDown className="chevron" />
          </div>
          <div className="toolbar-btns">
            <button
              className="btn btn-save"
              onClick={handleSaveSnippet}
              disabled={saving}
            >
              {saving ? <FiLoader className="spin" /> : <FiSave />}
              <span>{saving ? "Saving..." : "Save"}</span>
            </button>
            <button
              className="btn btn-review"
              onClick={handleReviewWithAI}
              disabled={reviewing}
            >
              {reviewing ? <FiLoader className="spin" /> : <FiZap />}
              <span>{reviewing ? "Reviewing..." : "Review with AI"}</span>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="btn btn-back"
            >
              <FiArrowLeft />
              Back to Dashboard
            </button>
          </div>
        </div>

        {success && (
          <div className="toast toast-success">
            <FiCheckCircle />
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="toast toast-error">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        {promptToSave && (
          <div className="toast toast-prompt">
            <FiZap />
            <span>{promptToSave}</span>
            <div className="toast-actions">
              <button
                className="btn btn-save btn-sm"
                onClick={handleSaveCorrectedCode}
              >
                Save Corrected
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setPromptToSave("")}
              >
                <FiX />
              </button>
            </div>
          </div>
        )}

        <div className="editor-card glass">
          <div className="editor-card-bar">
            <div className="bar-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="bar-title">
              <FiCode /> {title || "untitled"} · {language}
            </div>
            <div className="bar-status">
              <span className="status-dot" /> Ready
            </div>
          </div>
          <Editor
            height="480px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              automaticLayout: true,
              lineNumbers: "on",
              wordWrap: "on",
              tabSize: 2,
              scrollBeyondLastLine: false,
              formatOnPaste: true,
              padding: { top: 20 },
            }}
          />
        </div>

        {reviewing && (
          <div className="loading-card glass">
            <div className="loader-ring" />
            <h3>AI is analyzing your code...</h3>
            <p>
              Detecting bugs · Improving readability · Optimizing performance
            </p>
          </div>
        )}

        {aiResult && (
          <div className="ai-results">
            <div className="ai-results-header glass">
              <div>
                <h2>
                  <FiZap /> AI Review Complete
                </h2>
                <p>Your code has been analyzed. Review the results below.</p>
              </div>
              {codeQuality && (
                <div
                  className="grade-badge"
                  style={{ background: getGradeBg(codeQuality.grade) }}
                >
                  {codeQuality.grade}
                </div>
              )}
            </div>

            <div className="diff-grid">
              <div className="diff-card glass">
                <div className="diff-label original">
                  <FiCode /> Original Code
                </div>
                <Editor
                  height="340px"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                  }}
                />
              </div>
              <div className="diff-card glass">
                <div className="diff-label corrected">
                  <FiCheckCircle /> Corrected Code
                </div>
                <Editor
                  height="340px"
                  language={language}
                  theme="vs-dark"
                  value={aiResult.correctedCode}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                  }}
                />
              </div>
            </div>

            {codeQuality && (
              <div className="quality-card glass">
                <h3>
                  <FiTrendingUp /> Code Quality
                </h3>
                <div className="quality-body">
                  <div
                    className="score-ring"
                    style={{
                      "--score-color": getScoreColor(codeQuality.score),
                    }}
                  >
                    <div className="score-inner">
                      <span className="score-num">{codeQuality.score}</span>
                      <span className="score-label">/ 10</span>
                    </div>
                  </div>
                  <div className="quality-metrics">
                    {[
                      {
                        icon: <FiBook />,
                        label: "Readability",
                        data: codeQuality.readability,
                      },
                      {
                        icon: <FiShield />,
                        label: "Maintainability",
                        data: codeQuality.maintainability,
                      },
                      {
                        icon: <FiTrendingUp />,
                        label: "Performance",
                        data: codeQuality.performance,
                      },
                      {
                        icon: <FiCheckCircle />,
                        label: "Best Practices",
                        data: codeQuality.bestPractices,
                      },
                    ].map(({ icon, label, data }) => (
                      <div className="metric-item" key={label}>
                        <div className="metric-top">
                          <span className="metric-icon">{icon}</span>
                          <span className="metric-label">{label}</span>
                          <span
                            className="metric-score"
                            style={{ color: getScoreColor(data?.score) }}
                          >
                            {data?.score}/10
                          </span>
                        </div>
                        <div className="metric-bar">
                          <div
                            className="metric-fill"
                            style={{
                              width: `${(data?.score / 10) * 100}%`,
                              background: getScoreColor(data?.score),
                            }}
                          />
                        </div>
                        <p className="metric-feedback">{data?.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {codeQuality.codeSmells?.length > 0 && (
                  <div className="smells">
                    <h4>Code Smells</h4>
                    <div className="smells-list">
                      {codeQuality.codeSmells.map((s, i) => (
                        <span className="smell-tag" key={i}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {aiResult.explanation?.length > 0 && (
              <div className="ai-card glass">
                <h3>
                  <FiBook /> Line by Line Explanation
                </h3>
                <div className="explanation-list">
                  {aiResult.explanation.map((item, i) => (
                    <div className="explanation-item" key={i}>
                      <span className="line-num">L{item.line}</span>
                      <div className="explanation-body">
                        <code className="line-code">{item.code}</code>
                        <p>{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiResult.bugs?.length > 0 && (
              <div className="ai-card glass">
                <h3>
                  <FiAlertCircle /> Bugs Found ({aiResult.bugs.length})
                </h3>
                <div className="bugs-list">
                  {aiResult.bugs.map((bug, i) => (
                    <div className={`bug-item sev-${bug.severity}`} key={i}>
                      <div className="bug-top">
                        <span className="line-num">L{bug.line}</span>
                        <span className={`sev-badge sev-${bug.severity}`}>
                          {bug.severity}
                        </span>
                      </div>
                      <p>{bug.issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiResult.solutions?.length > 0 && (
              <div className="ai-card glass">
                <h3>
                  <FiCheckCircle /> Solutions
                </h3>
                <div className="solutions-list">
                  {aiResult.solutions.map((sol, i) => (
                    <div className="solution-item" key={i}>
                      <span className="line-num">L{sol.line}</span>
                      <div>
                        <p className="fix-text">
                          <strong>Fix:</strong> {sol.fix}
                        </p>
                        <p className="reason-text">
                          <strong>Why:</strong> {sol.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiResult.optimizations?.length > 0 && (
              <div className="ai-card glass">
                <h3>
                  <FiTrendingUp /> Optimizations
                </h3>
                <div className="optimizations-list">
                  {aiResult.optimizations.map((opt, i) => (
                    <div className="optimization-item" key={i}>
                      <h4>{opt.title}</h4>
                      <p>{opt.description}</p>
                      <div className="opt-diff">
                        <div className="opt-before">
                          <span>Before</span>
                          <code>{opt.before}</code>
                        </div>
                        <div className="opt-after">
                          <span>After</span>
                          <code>{opt.after}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiResult.summary && (
              <div className="summary-card glass">
                <h3>Summary</h3>
                <p>{aiResult.summary}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
