'use client';

import apiSlice from '@/features/api/apiSlice';
import matchReducer from '@/features/slices/matchSlice';
import { configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      match: matchReducer
   },
   devTools: true,
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)
});

export { Provider };
export default store;
