import { createSlice } from "@reduxjs/toolkit";

import gameApi from "@/api/game.api";
import { Game } from "@/types";

interface GameState {
    [id: string]: Game;
};

const gameSlice = createSlice({
  name: 'games',
  initialState: {} as GameState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        gameApi.endpoints.getUserGames.matchFulfilled,
        (state, action) => {
            const {games} = action.payload;
            games.forEach(game => {
                state[game.id] = game;
            });
        }
      );
  }
});

export default gameSlice.reducer;