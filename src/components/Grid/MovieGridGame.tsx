import React, { useState } from "react";
import { Grid } from "./Grid";
import { predefinedGames } from "./predefinedGames";
import { fetchActorDetails } from "./tmdbAPI";

export const MovieGridGame: React.FC = () => {
  const [gameIndex, setGameIndex] = useState(0);
  const [gridState, setGridState] = useState<string[][]>([["","",""],["","",""],["","",""]]);

  const { rowMovies, columnMovies } = predefinedGames[gameIndex];

  const handleActorSelected = async (row: number, col: number, actor: string) => {
    const rowMovie = rowMovies[row];
    const colMovie = columnMovies[col];

    const isActorValid = await fetchActorDetails(rowMovie.title, colMovie.title, actor);

    if (isActorValid) {
      const newGridState = [...gridState];
      newGridState[row][col] = actor;
      setGridState(newGridState);
    } else {
      alert("Incorrect actor! Try again.");
    }
  };

  const handleNextGame = () => {
    setGameIndex((prev) => (prev + 1) % predefinedGames.length);
    setGridState([]);
  };

  return (
    <div>
      <h1>Movie Grid Game</h1>
      <Grid
        rowMovies={rowMovies}
        columnMovies={columnMovies}
        onActorSelected={handleActorSelected}
        gridState={gridState}
      />
      <div className="button-group">
        <button onClick={handleNextGame}>Next Game</button>
      </div>
    </div>
  );
};
