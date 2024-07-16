import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from './slices/leaderboardSlice';

const db = configureStore({
  reducer: {
    // players: playerReducer,
    leaderboard: leaderboardReducer,
  },
});

export default db;
