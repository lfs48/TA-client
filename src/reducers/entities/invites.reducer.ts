import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import gameApi from "@/api/game.api";
import { Invite, RootState } from "@/types";
import { createAppSelector } from "@/util/appSelector";

interface InvitesState {
  [id: string]: Invite;
}

const invitesSlice = createSlice({
  name: "invites",
  initialState: {} as InvitesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          gameApi.endpoints.getGameById.matchFulfilled,
          gameApi.endpoints.getGameByPassphrase.matchFulfilled,
          gameApi.endpoints.postGame.matchFulfilled,
          gameApi.endpoints.patchGame.matchFulfilled,
          gameApi.endpoints.removePlayer.matchFulfilled,
        ),
        (state, action) => {
          const { game } = action.payload;
          if (game && Array.isArray(game.invites)) {
            game.invites.forEach((invite: Invite) => {
              state[invite.id] = invite;
            });
          }
        }
      )
      .addMatcher(
        gameApi.endpoints.getUserGames.matchFulfilled,
        (state, action) => {
          const { games } = action.payload;
          games.forEach((game) => {
            if (game.invites && Array.isArray(game.invites)) {
              game.invites.forEach((invite: Invite) => {
                state[invite.id] = invite;
              });
            }
          });
        }
      );
  },
});

export const selectInviteById = createAppSelector(
  [
    (state: RootState) => state.entities.invites,
    (_: RootState, id?: string) => id,
  ],
  (invites, id) => (id ? invites[id] : undefined)
);

export const selectInvitesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.invites,
    (_: RootState, ids?: string[]) => ids,
  ],
  (invites, ids) =>
    ids ? ids.map((id) => invites[id]).filter((invite) => invite !== undefined) : []
);

export default invitesSlice.reducer;