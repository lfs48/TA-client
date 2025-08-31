import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Reality, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import realitiesApi from "@/api/realities.api";
import arcsApi from "@/api/arcs.api";

interface RealitiesState {
  [id: string]: Reality;
}

const realitiesSlice = createSlice({
  name: "realities",
  initialState: {} as RealitiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(realitiesApi.endpoints.getRealities.matchFulfilled, (state, action) => {
        const { realities } = action.payload;
        realities.forEach((reality: Reality) => {
          state[reality.id] = reality;
        });
      })
      .addMatcher(arcsApi.endpoints.getARCs.matchFulfilled, (state, action) => {
        const { realities } = action.payload;
        realities.forEach((reality: Reality) => {
          state[reality.id] = reality;
        });
      })
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getAgent.matchFulfilled,
          agentApi.endpoints.postAgent.matchFulfilled,
        ),
        (state, action) => {
          const { agent } = action.payload;
          if (agent.reality) {
            state[agent.reality.id] = agent.reality;
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
            if (agent.reality) {
              state[agent.reality.id] = agent.reality;
            }
          });
        }
      );
  }
});

// Selectors
export const selectRealityById = createAppSelector(
  [
    (state: RootState) => state.entities.realities,
    (_: RootState, id?: string) => id,
  ],
  (realities, id) => (id ? realities[id] : undefined)
);

export const selectRealitiesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.realities,
    (_: RootState, ids?: string[]) => ids,
  ],
  (realities, ids) =>
    ids ? ids.map((id) => realities[id]).filter((reality) => reality !== undefined) : []
);

export default realitiesSlice.reducer;