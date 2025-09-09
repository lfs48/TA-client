import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Anomaly, APIAgent, APIAnomaly, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import anomaliesApi from "@/api/anomalies.api";
import arcsApi from "@/api/arcs.api";

interface AnomaliesState {
  [id: string]: Anomaly;
}

const anomaliesSlice = createSlice({
  name: "anomalies",
  initialState: {} as AnomaliesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(
        isAnyOf(
          anomaliesApi.endpoints.getAnomalies.matchFulfilled,
          arcsApi.endpoints.getARCs.matchFulfilled,
        ),
        (state, action) => {
          const { anomalies } = action.payload;
          anomalies.forEach((anomaly) => {
            state[anomaly.id] = stripAnomalyRelations(anomaly);
          });
        }
      )
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getAgent.matchFulfilled,
          agentApi.endpoints.postAgent.matchFulfilled,
        ),
        (state, action) => {
          const { agent } = action.payload;
          if (agent.anomaly) {
            state[agent.anomaly.id] = agent.anomaly;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getUserAgents.matchFulfilled,
          agentApi.endpoints.getGameAgents.matchFulfilled,
        ),
        (state, action) => {
          const { agents } = action.payload;
          agents.forEach((agent: APIAgent) => {
            if (agent.anomaly) {
              state[agent.anomaly.id] = agent.anomaly;
            }
          });
        }
      )
  }
});

// Selectors
export const selectAnomalyById = createAppSelector(
  [
    (state: RootState) => state.entities.anomalies,
    (_: RootState, id?: string) => id,
  ],
  (anomalies, id) => (id ? anomalies[id] : undefined)
);

export const selectAnomaliesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.anomalies,
    (_: RootState, ids?: string[]) => ids,
  ],
  (anomalies, ids) =>
    ids ? ids.map((id) => anomalies[id]).filter((anomaly) => anomaly !== undefined) : []
);

export default anomaliesSlice.reducer;

function stripAnomalyRelations(anomaly: APIAnomaly) {
  return {
    ...anomaly,
    abilities: undefined,
  }
}