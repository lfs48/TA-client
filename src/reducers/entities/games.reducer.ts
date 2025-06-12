import { createSelector, createSlice } from "@reduxjs/toolkit";

import gameApi from "@/api/game.api";
import { Game, RootState } from "@/types";

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
            gameApi.endpoints.getGame.matchFulfilled,
            (state, action) => {
                const {game} = action.payload;
                state[game.id] = game;
            }
        )
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

export const selectGameById = createSelector(
    [
        (state: RootState) => state.entities.games,
        (_: RootState, id?: string) => id
    ],
    (games, id) => (id ? games[id] : undefined)
);

export default gameSlice.reducer;