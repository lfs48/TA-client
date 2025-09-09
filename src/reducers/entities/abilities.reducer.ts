import { createSlice } from "@reduxjs/toolkit";
import { Ability, RootState } from "@/types";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import anomaliesApi from "@/api/anomalies.api";
import arcsApi from "@/api/arcs.api";

interface AbilitiesState {
  [id: string]: Ability;
}

const abilitiesSlice = createSlice({
  name: "abilities",
  initialState: {} as AbilitiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(anomaliesApi.endpoints.getAnomalies.matchFulfilled, (state, action) => {
        const { anomalies } = action.payload;
        anomalies.forEach((anomaly) => {
          if (anomaly.abilities) {
            anomaly.abilities.forEach((ability: Ability) => {
              state[ability.id] = ability;
            });
          }
        });
      })
      .addMatcher(arcsApi.endpoints.getARCs.matchFulfilled, (state, action) => {
        const { anomalies } = action.payload;
        anomalies.forEach((anomaly) => {
          if (anomaly.abilities) {
            anomaly.abilities.forEach((ability: Ability) => {
              state[ability.id] = ability;
            });
          }
        });
      });
  }
});

// Selectors
export const selectAbilityById = createAppSelector(
  [
    (state: RootState) => state.entities.abilities,
    (_: RootState, id?: string) => id,
  ],
  (abilities, id) => (id ? abilities[id] : undefined)
);

export const selectAbilitiesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.abilities,
    (_: RootState, ids?: string[]) => ids,
  ],
  (abilities, ids) =>
    ids ? ids.map((id) => abilities[id]).filter((ability) => ability !== undefined) : []
);

export const selectAbilitiesByAnomalyId = createAppSelector(
  [
    (state: RootState) => state.entities.abilities,
    (_: RootState, anomalyId?: string) => anomalyId,
  ],
  (abilities, anomalyId) =>
    anomalyId 
      ? Object.values(abilities).filter((ability) => ability.anomalyId === anomalyId)
      : []
);

export default abilitiesSlice.reducer;