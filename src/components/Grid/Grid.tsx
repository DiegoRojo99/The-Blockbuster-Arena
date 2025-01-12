import React, { useState } from "react";
import './Grid.css';
import { fetchActorSuggestions } from "./tmdbAPI";

type GridProps = {
  grid: string[][];
  onActorSelected: (row: number, col: number, actor: string) => void;
};

export const Grid: React.FC<GridProps> = ({ grid, onActorSelected }) => {
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
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex ? "active" : ""}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
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
