import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const rateMovie = createAsyncThunk(
  "ratings/rateMovie",
  async (
    { movieId, userRate }: { movieId: string; userRate: number },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue("Токен не найден");
    }

    try {
      const response = await fetch("http://localhost:3030/api/v1/rateMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId, user_rate: userRate }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
      ratings[movieId] = userRate;
      localStorage.setItem("ratings", JSON.stringify(ratings));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    ratings: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rateMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rateMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { movieId, newAverageRate, newTotalRatesCount } = action.payload;
        state.ratings[movieId] = {
          newAverageRate,
          newTotalRatesCount,
        };
      })
      .addCase(rateMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default ratingsSlice.reducer;
export const selectRatings = (state: RootState) => state.auth;
