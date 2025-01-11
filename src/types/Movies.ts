type MovieWithCredits = {
  id: number;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  tagline: string;
  overview: string;
  poster_path: string;
  credits: {
    cast: { name: string; character: string }[];
    crew: { name: string; job: string }[];
  };
};

export type {
  MovieWithCredits
}