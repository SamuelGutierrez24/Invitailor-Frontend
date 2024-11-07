// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventSlice/event.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
