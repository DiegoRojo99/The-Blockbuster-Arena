// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Casted from "./components/Casted/Casted";
import GridGame from "./components/Grid/GridGame";

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
            <a href="/">
              The Blockbuster Arena
            </a>
          </h2>
        </header>
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="app-nav">
            <Link to="/casted" className="nav-link" onClick={closeSidebar}>Casted</Link>
            {/* <Link to="/game1" className="nav-link" onClick={closeSidebar}>Blurred Poster Game</Link> */}
            {/* <Link to="/game2" className="nav-link" onClick={closeSidebar}>Guess the Movie by Cast</Link> */}
            {/* <Link to="/game3" className="nav-link" onClick={closeSidebar}>Degrees of Separation</Link> */}
            <Link to="/grid" className="nav-link" onClick={closeSidebar}>Grid Game</Link>
          </nav>
        </div>
        <main className="app-main">
          <Routes>
            {/* <Route path="/game1" element={<div>Blurred Poster Game Component</div>} /> */}
            {/* <Route path="/game2" element={<div>Guess the Movie by Cast Component</div>} /> */}
            {/* <Route path="/game3" element={<div>Degrees of Separation Component</div>} /> */}
            <Route path="/grid" element={<GridGame />} />
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
