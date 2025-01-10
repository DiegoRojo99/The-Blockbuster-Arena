import React, { useState } from 'react';
import './MovieGuess.css';

const MovieGuessDropdown: React.FC<{ movies: any[], selectedMovie: string, setSelectedMovie: (movie: string) => void }> = ({ movies, selectedMovie, setSelectedMovie }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='movie-guess-div'>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
        <option value="">Select a movie...</option>
        {filteredMovies.map(movie => (
          <option key={movie.id} value={movie.title}>
            {movie.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieGuessDropdown;