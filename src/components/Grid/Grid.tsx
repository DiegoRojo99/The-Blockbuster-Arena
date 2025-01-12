import React, { useState } from "react";
import { fetchActorSuggestions } from "./tmdbAPI";
import './Grid.css';

type Movie = {
  title: string;
  poster: string;
};

type GridProps = {
  rowMovies: Movie[];
  columnMovies: Movie[];
  onActorSelected: (row: number, col: number, actor: string) => void;
};

export const Grid: React.FC<GridProps> = ({ rowMovies, columnMovies, onActorSelected }) => {
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [actorName, setActorName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
    setActorName("");
    setSuggestions([]);
  };

  const handleActorChange = async (value: string) => {
    setActorName(value);
    const suggestions = await fetchActorSuggestions(value);
    setSuggestions(suggestions);
  };

  const handleActorSelect = (actor: string) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      onActorSelected(row, col, actor);
      setSelectedCell(null);
      setActorName("");
    }
  };

  return (
    <div className="grid-container">
      {/* Grid Structure: 4 columns (Empty, Column Movies, and the Grid of Cells) */}
      <div className="grid">
        {/* Empty Column */}
        <div className="empty-column" />

        {/* Column Movies */}
        {columnMovies.map((movie, index) => (
          <div key={index} className="movie-header">
            {/* <img src={movie.poster} alt={movie.title} className="movie-poster" /> */}
            <p>{movie.title}</p>
          </div>
        ))}

        {/* Row Movies and the Grid of Cells */}
        {rowMovies.map((movie, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Row Movie with Poster */}
            <div className="row-movie">
              {/* <img src={movie.poster} alt={movie.title} className="movie-poster" /> */}
              <p>{movie.title}</p>
            </div>

            {/* Grid of Cells */}
            {columnMovies.map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell ${
                  selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex ? "active" : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {/* Placeholder for guessed actor */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Actor Input */}
      {selectedCell && (
        <div className="actor-input-container">
          <input
            type="text"
            value={actorName}
            onChange={(e) => handleActorChange(e.target.value)}
            placeholder="Type an actor's name"
          />
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleActorSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
