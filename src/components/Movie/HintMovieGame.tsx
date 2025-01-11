import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Movies.css';
import { MovieWithCredits } from '../../types/Movies';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const DEBOUNCE_DELAY = 800;


const HintMovieGame: React.FC = () => {
  const [movie, setMovie] = useState<MovieWithCredits | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [guessed, setGuessed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);

  const fetchRandomMovie = async () => {
    try {
      const randomPage = Math.floor(Math.random() * 500) + 1;
      const { data: topRated } = await axios.get(
        `${TMDB_BASE_URL}/movie/top_rated`,
        {
          params: {
            api_key: TMDB_API_KEY,
            language: 'en-US',
            page: randomPage,
          },
        }
      );

      const randomMovie =
        topRated.results[
          Math.floor(Math.random() * topRated.results.length)
        ];

      const { data: movieDetails } = await axios.get(
        `${TMDB_BASE_URL}/movie/${randomMovie.id}`,
        {
          params: {
            api_key: TMDB_API_KEY,
            append_to_response: 'credits',
          },
        }
      );

      setMovie(movieDetails);
      setHints(generateHints(movieDetails));
      setHintIndex(0);
      setGuessed(false);
      setUserInput('');
      setSuggestions([]);
      if(error) setError(null);
    } 
    catch (err) {
      setError('Failed to fetch movie. Try again.');
    }
  };

  const generateHints = (movie: MovieWithCredits): string[] => {
    const genres = movie.genres.map((g) => g.name).join(', ');
    const director = movie.credits.crew.find((c) => c.job === 'Director')?.name;
    const minorCast = movie.credits.cast.slice(1, 4).map((c) => c.name).join(', ');
    const leadActor = movie.credits.cast[0]?.name;
    const mainCharacters = movie.credits.cast
      .slice(0, 3)
      .map((c) => c.character)
      .join(', ');

    return [
      `Release Year: ${movie.release_date.split('-')[0]}`,
      `Genres: ${genres}`,
      `Minor Cast: ${minorCast}`,
      `Tagline: "${movie.tagline || 'No tagline available'}"`,
      `Director: ${director || 'Unknown'}`,
      `Main Characters: ${mainCharacters}`,
      `Summary: ${movie.overview}`,
      `Lead Actor: ${leadActor || 'Unknown'}`,
    ];
  };

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoadingSuggestions(true);
      const { data } = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
          language: 'en-US',
        },
      });

      let resultTitles: string[] = data.results.sort((a: any, b: any) => b.popularity - a.popularity).map((result: any) => result.title); 
      const movieTitles: string[] = [...new Set(resultTitles)];
      setSuggestions(movieTitles);
      if(error) setError(null);
    } 
    catch (err) {
      setError('Failed to fetch suggestions.');
    } 
    finally {
      setIsLoadingSuggestions(false);
    }
  };

  const debounce = useCallback(
    (callback: (...args: any[]) => void, delay: number) => {
      let timer: NodeJS.Timeout;
      return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
      };
    },
    []
  );

  const handleInputChange = (value: string) => {
    setUserInput(value);
    debouncedFetchSuggestions(value);
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, DEBOUNCE_DELAY),
    []
  );

  const handleSubmit = () => {
    if (movie && userInput.toLowerCase() === movie.title.toLowerCase()) {
      setGuessed(true);
      setSuggestions([]);
    } else if (hintIndex < hints.length - 1) {
      setHintIndex(hintIndex + 1);
    } else {
      setGuessed(true);
    }
  };

  const handleGiveUp = () => {
    setGuessed(true);
  };

  const clearInput = () => {
    setUserInput('');
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  return (
    <div className="game-container">
      <h1>Guess the Movie</h1>
      {error && <p className="error">{error}</p>}
      {movie && (
        <>
          <div className="hints">
            {hints.slice(0, hintIndex + 1).map((hint, index) => (
              <div key={index} className="hint">
                <span className="hint-label">
                  {hint.split(':')[0]}
                </span>
                <span className="hint-value">{hint.split(':')[1]}</span>
              </div>
            ))}
          </div>
          {!guessed ? (
            <>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Type your guess"
                  value={userInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                {userInput && <button className="clear-btn" onClick={clearInput}>X</button>}
              </div>
              {isLoadingSuggestions && <p>Loading suggestions...</p>}
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => setUserInput(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
              <div className="button-group">
                <button className="btn-submit" onClick={handleSubmit}>Submit</button>
                <button className="btn-giveup" onClick={handleGiveUp}>Give Up</button>
                <button className="btn-new-game" onClick={fetchRandomMovie}>Start New Game</button>
              </div>
            </>
          ) 
        : 
          (
            <>
              {userInput.toLowerCase() === movie.title.toLowerCase() ? (
                <p className="endgame-text">
                  🎉 Correct! The movie is <br />
                  <strong>{movie.title}</strong> 🎉
                </p>
              ) : (
                <p className="endgame-text">
                  The correct answer was <br />
                  <strong>{movie.title}</strong>.
                </p>
              )}
              <button className="btn-new-game" onClick={fetchRandomMovie}>Start New Game</button>
            </>
          )
        }
        </>
      )}
    </div>
  );
};

export default HintMovieGame;
