import React from "react";
import Login_Component from "./components/Login_Component.jsx";
import Register_Component from "./components/Register_Component.jsx";
import Update_Profile from "./components/Update_Profile.jsx";
import CodeEditor_Component from "./components/CodeEditor_Component.jsx";
import Saved_Snippets from "./components/Saved_Snippets.jsx";
import Edit_Snippet_Component from "./components/Edit_Snippet_Component.jsx";
import Profile from "./pages/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login_Component />} />
          <Route path="/register" element={<Register_Component />} />
          <Route path="/update-profile" element={<Update_Profile />} />
          <Route path="/create-snippet" element={<CodeEditor_Component />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/snippets" element={<Saved_Snippets />} />
          <Route
            path="/edit-snippet/:snippetId"
            element={<Edit_Snippet_Component />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
