import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchActorSuggestions = async (query: string): Promise<string[]> => {
  if (!query) return [];
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results.map((person: any) => person.name);
};

const fetchActorDetails = async (rowMovie: string, colMovie: string, actorName: string) => {
  try {
    // Search for actor ID using the actor's name
    const actorSearchResponse = await axios.get(`${BASE_URL}/search/person`, {
      params: {
        api_key: API_KEY,
        query: actorName,
      },
    });

    // If no actor found, return false
    if (!actorSearchResponse.data.results.length) {
      return false;
    }

    const actorId = actorSearchResponse.data.results[0].id;

    // Fetch cast of the row movie
    const rowMovieResponse = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: rowMovie,
      },
    });

    if (!rowMovieResponse.data.results.length) {
      return false;
    }

    const rowMovieId = rowMovieResponse.data.results[0].id;

    // Get cast for the row movie
    const rowMovieCastResponse = await axios.get(`${BASE_URL}/movie/${rowMovieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Check if the actor is in the row movie cast
    const actorInRowMovie = rowMovieCastResponse.data.cast.some((castMember: any) => castMember.id === actorId);

    // Fetch cast of the column movie
    const colMovieResponse = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: colMovie,
      },
    });

    if (!colMovieResponse.data.results.length) {
      return false;
    }

    const colMovieId = colMovieResponse.data.results[0].id;

    // Get cast for the column movie
    const colMovieCastResponse = await axios.get(`${BASE_URL}/movie/${colMovieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Check if the actor is in the column movie cast
    const actorInColMovie = colMovieCastResponse.data.cast.some((castMember: any) => castMember.id === actorId);
    console.log("Column cast: ", colMovieCastResponse.data.cast)
    console.log("Row cast: ", rowMovieCastResponse.data.cast)
    console.log("Actor ID: ", actorId)

    // Return true if the actor is in both movies
    return actorInRowMovie && actorInColMovie;
  } catch (error) {
    console.error("Error fetching actor details:", error);
    return false;
  }
};

export {
  fetchActorDetails, 
  fetchActorSuggestions
}
