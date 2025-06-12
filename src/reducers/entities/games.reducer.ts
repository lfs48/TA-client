import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import gameApi from "@/api/game.api";
import { Game, RootState } from "@/types";
import { createAppSelector } from "@/util/appSelector";

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
            isAnyOf(
                gameApi.endpoints.getGame.matchFulfilled,
                gameApi.endpoints.postGame.matchFulfilled,
            ),
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

export const selectGames = createAppSelector(
    (state: RootState) => state.entities.games,
    (games) => Object.values(games)
);

export const selectGameById = createAppSelector(
    [
        (state) => state.entities.games,
        (_, id?: string) => id
    ],
    (games, id) => (id ? games[id] : undefined)
);

export default gameSlice.reducer;