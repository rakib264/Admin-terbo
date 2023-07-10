import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   matchData: {}
};

export const matchSlice = createSlice({
   name: 'match',
   initialState,
   reducers: {
      storeSingleMatchData: (state, action) => {
         state.matchData = action.payload;
      }
   }
});

// Action creators are generated for each case reducer function
export const { storeSingleMatchData } = matchSlice.actions;

export default matchSlice.reducer;
