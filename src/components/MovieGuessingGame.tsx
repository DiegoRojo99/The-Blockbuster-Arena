import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CastDisplay from './CastDisplay';
import MovieGuessDropdown from './MovieGuessDropdown';
import { CastActor, Movie } from '../Types';

const MovieGuessingGame: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [correctMovie, setCorrectMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastActor[]>([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [guessResult, setGuessResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);

        let moviesResult: Movie[] = response.data.results;        
        const randomMovie = moviesResult[Math.floor(Math.random() * moviesResult.length)];

        setMovies(moviesResult);
        setCorrectMovie(randomMovie);
        fetchMovieCredits(randomMovie.id);

      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const fetchMovieCredits = async (movieId: number) => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
      setCast(response.data.cast);
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    }
  };

  const handleGuess = () => {
    if (selectedMovie === correctMovie?.title) {
      setGuessResult('Correct! You guessed the movie!');
    } else {
      setGuessResult('Incorrect! Try again!');
    }
  };

  return (
    <div>
      <h1>Movie Guessing Game</h1>
      <CastDisplay cast={cast} />
      <MovieGuessDropdown movies={movies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      <button className='movie-guess-button' onClick={handleGuess} disabled={!selectedMovie}>Guess Movie</button>
      {guessResult && <p>{guessResult}</p>}
    </div>
  );
};

export default MovieGuessingGame;
