import { createSlice, configureStore } from "@reduxjs/toolkit";

const tradingDateSilce = createSlice({
  name: "monthYearDate",
  initialState: { date: new Date().toISOString() },
  reducers: {
    dateChange(state, action) {
      state.date = action.payload;
    },
  },
});

const calendarStore = configureStore({
  reducer: { date: tradingDateSilce.reducer },
});

export const dateActions = tradingDateSilce.actions;
export default calendarStore;
