import { createSlice } from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: [],
  reducers: {
    recordMatch: (state, action) => {
      const { p1, p2, status, playerWin } = action.payload;
      state.push({ p1, p2, status, playerWin });
    },
  },
});

export const { recordMatch } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
