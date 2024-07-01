import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./services/moviesApi";
import authReducer from "./services/authSlice";
import ratingsReducer from "./services/ratingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorHandlingMiddleware } from "./services/errorHandlingMiddleware";

const actionSanitizer = (action: any) =>
  action.type === "moviesApi/executeQuery/pending" && action.payload
    ? { ...action, payload: "<<LONG_BLOB>>" }
    : action;

const stateSanitizer = (state: any) =>
  state.moviesApi ? { ...state, moviesApi: "<<LONG_BLOB>>" } : state;

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
  devTools: {
    actionSanitizer,
    stateSanitizer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch as () => AppDispatch;
export const useAppSelector = useSelector as <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;
