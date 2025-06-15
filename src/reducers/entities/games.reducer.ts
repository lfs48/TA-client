import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import gameApi from "@/api/game.api";
import { Game, RootState } from "@/types";
import { createAppSelector } from "@/util/appSelector";
import { spaceship } from "@/util/spaceship";

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
                gameApi.endpoints.getGameById.matchFulfilled,
                gameApi.endpoints.getGameByPassphrase.matchFulfilled,
                gameApi.endpoints.postGame.matchFulfilled,
                gameApi.endpoints.patchGame.matchFulfilled,
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
        .sort( (a,b) => spaceship(b.createdAt, a.createdAt))
);

export const selectGameById = createAppSelector(
    [
        (state) => state.entities.games,
        (_, id?: string) => id
    ],
    (games, id) => (id ? games[id] : undefined)
);

export default gameSlice.reducer;