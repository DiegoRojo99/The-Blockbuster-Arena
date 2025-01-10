import React, { useEffect, useState } from "react";
import GridCell from "./GridCell";
import "./GridGame.css";
import axios from "axios";
import ActorDisplay from "./ActorDisplay";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

const GridGame: React.FC = () => {
  const [rowActors, setRowActors] = useState<Actor[]>([]);
  const [columnActors, setColumnActors] = useState<Actor[]>([]);
  const [grid, setGrid] = useState<(string | null)[][]>(
    Array(4).fill(Array(3).fill(null))
  );

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const popularActorsResponse = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${TMDB_API_KEY}&page=1`
        );

        setRowActors(popularActorsResponse.data.results.slice(0, 3));
        setColumnActors(popularActorsResponse.data.results.slice(3, 6));
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    fetchActors();
  }, []);

  const handleMovieSubmit = (row: number, col: number, movie: string) => {
    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cell, colIndex) => (rowIndex === row && colIndex === col ? movie : cell))
    );
    setGrid(newGrid);
  };

  return (
    <div className="grid-game">
      <div className="grid-container">
        <div className="grid">
          {grid.map((row, rowIndex) => {
            if (rowIndex === 0) {
              return (
                <>
                  <div></div>
                  {columnActors.map((actor) => <ActorDisplay actor={actor} /> )}
                </>
              );
            } 
            else {
              return (
                <>
                  <div>
                    <ActorDisplay actor={rowActors[rowIndex - 1]} />
                  </div>
                  {row.map((cell, colIndex) => (
                    <GridCell
                      key={`${rowIndex}-${colIndex}`}
                      row={rowIndex}
                      col={colIndex}
                      movie={cell}
                      onSubmitMovie={handleMovieSubmit}
                    />
                  ))}
                </>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GridGame;
