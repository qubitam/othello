import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
// TODO: Add reducers here
export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: import.meta.env.DEV,
});

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;