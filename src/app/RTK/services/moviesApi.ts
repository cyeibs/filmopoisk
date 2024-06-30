import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { Movie, SearchResult } from "./types";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    searchMovies: build.query<
      SearchResult,
      { query?: string; page: number; filters?: Record<string, string> }
    >({
      query: ({ query = "", page, filters }) => {
        const params: Record<string, string | number> = { query, page };
        if (filters) {
          Object.keys(filters).forEach((key) => {
            params[key] = filters[key];
          });
        }
        return {
          url: `search`,
          params,
        };
      },
    }),
    getMovieById: build.query<Movie, string>({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieByIdQuery } = moviesApi;
