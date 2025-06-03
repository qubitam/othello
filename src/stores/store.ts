import { configureStore } from '@reduxjs/toolkit'

// TODO: Add reducers here
export const store = configureStore({
  reducer: {
  },
});

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;