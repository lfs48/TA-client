import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import userApi from "@/api/user.api";
import { User } from "@/types/User.types";
import { RootState } from "@/types";
import { createAppSelector } from "@/util/appSelector";
import gameApi from "@/api/game.api";
import { logout } from "@/reducers/session.reducer";

interface UsersState {
  [id: string]: User;
}

const usersSlice = createSlice({
  name: "users",
  initialState: {} as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(
      logout.type, () => {}
    )
    .addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, action) => {
        const { user } = action.payload;
        state[user.id] = user;
      }
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
            game.players.forEach(
              (player) => { state[player.id] = player; }
            );
            game.invitees.forEach(
              (invitee) => { state[invitee.id] = invitee; }
            )
        }
    );
  }
});

export const selectUserById = createAppSelector(
  [
    (state: RootState) => state.entities.users,
    (_: RootState, id?: string ) => id,
  ],
  (users, id) => (id ? users[id] : undefined)
);

export const selectUsersById = createAppSelector(
  [
    (state: RootState) => state.entities.users,
    (_: RootState, idArray?: string[]) => idArray,
  ],
  (users, idArray) => (idArray ? idArray
    .map(id => users[id] ? users[id] : undefined)
    .filter(user => user !== undefined
  ) : [])
);

export default usersSlice.reducer;