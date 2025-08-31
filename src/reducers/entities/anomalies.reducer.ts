import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Anomaly, APIAgent, RootState } from "@/types";
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
      .addMatcher(anomaliesApi.endpoints.getAnomalies.matchFulfilled, (state, action) => {
        const { anomalies } = action.payload;
        anomalies.forEach((anomaly: Anomaly) => {
          state[anomaly.id] = anomaly;
        });
      })
      .addMatcher(arcsApi.endpoints.getARCs.matchFulfilled, (state, action) => {
        const { anomalies } = action.payload;
        anomalies.forEach((anomaly: Anomaly) => {
          state[anomaly.id] = anomaly;
        });
      })
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