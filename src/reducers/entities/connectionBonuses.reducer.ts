import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ConnectionBonus, APIAgent, RootState } from "@/types";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import connectionBonusApi from "@/api/connection-bonus.api";

interface ConnectionBonusesState {
  [id: string]: ConnectionBonus;
}

const connectionBonusesSlice = createSlice({
  name: "connectionBonuses",
  initialState: {} as ConnectionBonusesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(connectionBonusApi.endpoints.getBonuses.matchFulfilled, (state, action) => {
        const { bonuses } = action.payload;
        bonuses.forEach((bonus: ConnectionBonus) => {
          state[bonus.id] = bonus;
        });
      });
  }
});

// Selectors
export const selectConnectionBonusById = createAppSelector(
  [
    (state: RootState) => state.entities.connectionBonuses,
    (_: RootState, id?: string) => id,
  ],
  (connectionBonuses, id) => (id ? connectionBonuses[id] : undefined)
);

export const selectConnectionBonusesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.connectionBonuses,
    (_: RootState, ids?: string[]) => ids,
  ],
  (connectionBonuses, ids) =>
    ids ? ids.map((id) => connectionBonuses[id]).filter((bonus) => bonus !== undefined) : []
);

export const selectAllConnectionBonuses = createAppSelector(
  [
    (state: RootState) => state.entities.connectionBonuses,
  ],
  (connectionBonuses) => Object.values(connectionBonuses)
);

export default connectionBonusesSlice.reducer;