// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

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
          <h2 className="app-title">The Blockbuster Arena</h2>
        </header>
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="app-nav">
            {/* <Link to="/game1" className="nav-link" onClick={closeSidebar}>Blurred Poster Game</Link>
            <Link to="/game2" className="nav-link" onClick={closeSidebar}>Guess the Movie by Cast</Link>
            <Link to="/game3" className="nav-link" onClick={closeSidebar}>Degrees of Separation</Link>
            <Link to="/game4" className="nav-link" onClick={closeSidebar}>3x3 Grid Game</Link> */}
          </nav>
        </div>
        <main className="app-main">
          <Routes>
            {/* <Route path="/game1" element={<div>Blurred Poster Game Component</div>} />
            <Route path="/game2" element={<div>Guess the Movie by Cast Component</div>} />
            <Route path="/game3" element={<div>Degrees of Separation Component</div>} />
            <Route path="/game4" element={<div>3x3 Grid Game Component</div>} /> */}
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
