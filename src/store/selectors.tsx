// src/store/selectors.ts
"use client";

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectFilteredEvents = createSelector(
  [(state: RootState) => state.events.events, (state: RootState) => state.events.filter],
  (events, filter) => events.filter((event) =>
    event.name.toLowerCase().includes(filter)
  )
);
