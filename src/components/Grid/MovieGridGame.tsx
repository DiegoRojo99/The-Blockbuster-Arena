import React, { useState } from "react";
import { Grid } from "./Grid";
import { predefinedGames } from "./predefinedGames";

export const MovieGridGame: React.FC = () => {
  const [gameIndex, setGameIndex] = useState(0);
  const [actorSelections, setActorSelections] = useState<string[][]>(
    Array(3).fill(Array(3).fill(""))
  );

  const handleActorSelected = (row: number, col: number, actor: string) => {
    const newSelections = [...actorSelections];
    newSelections[row][col] = actor;
    setActorSelections(newSelections);
  };

  const handleNextGame = () => {
    setGameIndex((prev) => (prev + 1) % predefinedGames.length);
    setActorSelections(Array(3).fill(Array(3).fill("")));
  };

  return (
    <div>
      <h1>Movie Grid Game</h1>
      <Grid
        grid={predefinedGames[gameIndex]}
        onActorSelected={handleActorSelected}
      />
      <button onClick={handleNextGame}>Next Game</button>
    </div>
  );
};
