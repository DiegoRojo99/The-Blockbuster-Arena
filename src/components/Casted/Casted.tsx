import React, { useState } from 'react';
import './Casted.css';
import ModeSelection from './ModeSelection';
import MovieGuessingGame from './MovieGuessingGame';

const Casted: React.FC = () => {
  const [gameMode, setGameMode] = useState<string | null>(null);

  const handleModeSelect = (mode: string | null) => {
    setGameMode(mode);
  };

  return (
    <div className='app-body'>
      <h1 style={{marginBottom: '32px'}}>Casted</h1>
      <div>
        {!gameMode ? 
          <ModeSelection onSelectMode={handleModeSelect} /> : 
          <MovieGuessingGame gameMode={gameMode} onSelectMode={handleModeSelect}/>
        }
      </div>
    </div>
  );
};

export default Casted;
