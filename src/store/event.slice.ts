// src/store/eventsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: string;
  name: string;
}

interface EventsState {
  events: Event[];
  filter: string;
}

const initialState: EventsState = {
  events: [],
  filter: '',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload.toLowerCase();
    },
  },
});

export const { setEvents, setFilter } = eventsSlice.actions;
export default eventsSlice.reducer;
