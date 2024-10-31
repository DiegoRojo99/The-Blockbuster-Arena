// src/components/PopularMovies.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface PopularMoviesProps {
  onMoviesFetched: (movies: Movie[]) => void;
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ onMoviesFetched }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        onMoviesFetched(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY, onMoviesFetched]);

  if (loading) {
    return <div>Loading popular movies...</div>;
  }

  return null;
};

export default PopularMovies;
