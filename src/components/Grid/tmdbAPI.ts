const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchActorSuggestions = async (query: string): Promise<string[]> => {
  if (!query) return [];
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results.map((person: any) => person.name);
};