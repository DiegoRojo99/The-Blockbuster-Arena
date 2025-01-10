import React, { useState } from "react";

interface GridCellProps {
  row: number;
  col: number;
  movie: string | null;
  onSubmitMovie: (row: number, col: number, movie: string) => void;
}

const GridCell: React.FC<GridCellProps> = ({ row, col, movie, onSubmitMovie }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmitMovie(row, col, input);
      setInput("");
    }
  };

  return (
    <div className="grid-cell">
      {movie ? (
        <div className="grid-cell-answer">
          <p>{movie}</p>
        </div>
      ) : (
        <div className="guess-cell">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Movie"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default GridCell;
