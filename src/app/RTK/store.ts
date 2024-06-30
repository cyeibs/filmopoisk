import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./services/moviesApi";
import authReducer from "./services/authSlice";
import ratingsReducer from "./services/ratingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorHandlingMiddleware } from "./services/errorHandlingMiddleware";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    ratings: ratingsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(errorHandlingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
