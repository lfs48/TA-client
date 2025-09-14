import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import gameApi from "@/api/game.api";
import { APIGame, Game, RootState } from "@/types";
import { createAppSelector } from "@/util/appSelector";
import { spaceship } from "@/util/spaceship";
import { logout } from "@/reducers/session.reducer";
import inviteApi from "@/api/invite.api";
import { receiveInvite } from "./invites.reducer";
import { agentApi } from "@/api/agent.api";

interface GameState {
    [id: string]: Game;
};

const gameSlice = createSlice({
  name: 'games',
  initialState: {} as GameState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        builder.addCase(
            logout.type, () => { return {} }
        )
        .addMatcher(
            isAnyOf(
                gameApi.endpoints.getGameById.matchFulfilled,
                gameApi.endpoints.getGameByPassphrase.matchFulfilled,
                gameApi.endpoints.postGame.matchFulfilled,
                gameApi.endpoints.patchGame.matchFulfilled,
                gameApi.endpoints.removePlayer.matchFulfilled,
            ),
            (state, action) => {
                const {game} = action.payload;
                state[game.id] = stripGameRelations(game);
            }
        )
        .addMatcher(
            gameApi.endpoints.getUserGames.matchFulfilled,
            (state, action) => {
                const {games} = action.payload;
                games.forEach(game => {
                    state[game.id] = stripGameRelations(game);
                });
            }
        )
        .addMatcher(
            inviteApi.endpoints.getUserInvites.matchFulfilled,
            (state, action) => {
                const { invites } = action.payload;
                invites.forEach(invite => {
                    if (invite.game) {
                        state[invite.game.id] = invite.game;
                    }
                });
            }
        )
        .addMatcher(
            isAnyOf(
                inviteApi.endpoints.acceptInvite.matchFulfilled,
                inviteApi.endpoints.rejectInvite.matchFulfilled,
                receiveInvite,
            ),
            (state, action) => {
                const { invite } = action.payload;
                if (invite.game) {
                    state[invite.game.id] = invite.game;
                }
            }
        )
        .addMatcher(
            agentApi.endpoints.postAgent.matchFulfilled,
            (state, action) => {
                const { agent } = action.payload;
                const game = state[agent.gameId];
                if (game) {
                    game.agentIds = [...(game.agentIds || []), agent.id];
                }
            }
        )
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

export const selectGameByPassphrase = createAppSelector(
    [
        (state) => state.entities.games,
        (_, passphrase?: string) => passphrase
    ],
    (games, passphrase) => (passphrase ? Object.values(games).find(game => game.passphrase === passphrase) : undefined)
);

export default gameSlice.reducer;

function stripGameRelations(game: APIGame) {
    return {
        ...game,
        gm: undefined,
        players: undefined,
    };
}