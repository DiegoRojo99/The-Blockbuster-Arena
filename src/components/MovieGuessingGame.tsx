import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CastDisplay from './CastDisplay';
import MovieGuessDropdown from './MovieGuessDropdown';
import { CastActor, Movie } from '../Types';

interface MovieGuessingGameProps {
  gameMode: string;
}

const MovieGuessingGame: React.FC<MovieGuessingGameProps> = ({gameMode}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [correctMovie, setCorrectMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastActor[]>([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [guessResult, setGuessResult] = useState<string | null>(null);
  const [castDisplayCount, setCastDisplayCount] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
      let endpoint = '';
      
      switch (gameMode.toLowerCase()) {
        case 'popular':
          endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
          break;
        case 'top rated':
          endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
          break;
        case 'upcoming':
          endpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
          break;
        case 'random':
          const randomPage = Math.floor(Math.random() * 100) + 1; // Adjust as needed
          endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${randomPage}`;
          break;
        default:
          console.error("Invalid game mode");
          return;
      }
      try {
        const response = await axios.get(endpoint);
        let moviesResult: Movie[] = response.data.results;        
        const randomMovie = moviesResult[Math.floor(Math.random() * moviesResult.length)];

        setMovies(moviesResult);
        setCorrectMovie(randomMovie);
        fetchMovieCredits(randomMovie.id);
        setGuessResult(null);

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
      setCastDisplayCount((prevCount) => Math.min(prevCount + 1, cast.length));    
    }
  };

  const emptyGuess = () => {
    setGuessResult('');
    setCastDisplayCount((prevCount) => Math.min(prevCount + 1, cast.length));    
  };

  const giveUp = () => {
    setGuessResult(`You gave up! The correct answer was ${correctMovie?.title}`);
  };

  return (
    <div>
      <CastDisplay cast={cast.slice(0, castDisplayCount)} />
      <MovieGuessDropdown movies={movies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      <button className='movie-guess-button' onClick={handleGuess} disabled={!selectedMovie}>Guess Movie</button>
      <button className='movie-guess-button' onClick={emptyGuess}>Another cast member</button>
      <button className='movie-guess-button' onClick={giveUp}>Give Up</button>
      {guessResult && <p style={{textAlign: 'center', padding: '0'}}>{guessResult}</p>}
      <div style={{paddingBottom: '16px'}}></div>
    </div>
  );
};

export default MovieGuessingGame;
