export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  release_year: number;
  director?: string;
  actors: Actors[];
}

export interface Actors {
  name: string;
  photo: string;
}

export interface SearchResult {
  search_result: Movie[];
  total_pages: number;
}
