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
  gridState: string[][];  // Pass in the grid state to track actor guesses
};

export const Grid: React.FC<GridProps> = ({ rowMovies, columnMovies, onActorSelected, gridState }) => {
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
    console.log("Sugs: ", suggestions)
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
      <div className="grid">
        <div className="empty-column" />

        {columnMovies.map((movie, index) => (
          <div key={index} className="movie-header">
            {/* <img src={movie.poster} alt={movie.title} className="movie-poster" /> */}
            <p>{movie.title}</p>
          </div>
        ))}

        {rowMovies.map((movie, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="row-movie">
              {/* <img src={movie.poster} alt={movie.title} className="movie-poster" /> */}
              <p>{movie.title}</p>
            </div>

            {columnMovies.map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell ${
                  selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex ? "active" : ""
                } ${gridState[rowIndex]?.[colIndex] ? "correct" : ""}`} // Add correct class for validated guesses
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {gridState[rowIndex]?.[colIndex] && <span>{gridState[rowIndex][colIndex]}</span>} {/* Show actor name if correct */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

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