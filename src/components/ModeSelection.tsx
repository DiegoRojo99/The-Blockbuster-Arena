import React from 'react';
import './ModeSelection.css';

interface ModeSelectionProps {
  onSelectMode: (mode: string) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode }) => {
  const modes = ['Popular', 'Top Rated', 'Random', 'Upcoming'];

  return (
    <div className="mode-selection">
      {modes.map((mode) => (
        <button
          key={mode}
          className="mode-button"
          onClick={() => onSelectMode(mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ModeSelection;
