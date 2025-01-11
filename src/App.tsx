import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Casted from "./components/Casted/Casted";
import HintMovieGame from "./components/Movie/HintMovieGame";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <h2 className="app-title">
            <a href="/">The Blockbuster Arena</a>
          </h2>
        </header>
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="app-nav">
            <Link to="/casted" className="nav-link" onClick={closeSidebar}>Casted</Link>
            <Link to="/movie" className="nav-link" onClick={closeSidebar}>Hint Movie Game</Link>
          </nav>
        </div>
        <main className="app-main">
          <Routes>
            <Route path="/movie" element={<HintMovieGame />} />
            <Route path="/casted" element={<Casted />} />
            <Route path="/" element={<div>Welcome to The Blockbuster Arena!</div>} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2025 The Blockbuster Arena</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
