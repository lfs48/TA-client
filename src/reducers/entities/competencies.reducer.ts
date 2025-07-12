import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Competency, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";

interface CompetenciesState {
  [id: string]: Competency;
}

const competenciesSlice = createSlice({
  name: "competencies",
  initialState: {} as CompetenciesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getAgent.matchFulfilled,
          agentApi.endpoints.postAgent.matchFulfilled,
        ),
        (state, action) => {
          const { agent } = action.payload;
          if (agent.competency) {
            state[agent.competency.id] = agent.competency;
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
            if (agent.competency) {
              state[agent.competency.id] = agent.competency;
            }
          });
        }
      );
  }
});

// Selectors
export const selectCompetencyById = createAppSelector(
  [
    (state: RootState) => state.entities.competencies,
    (_: RootState, id?: string) => id,
  ],
  (competencies, id) => (id ? competencies[id] : undefined)
);

export const selectCompetenciesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.competencies,
    (_: RootState, ids?: string[]) => ids,
  ],
  (competencies, ids) =>
    ids ? ids.map((id) => competencies[id]).filter((competency) => competency !== undefined) : []
);

export default competenciesSlice.reducer;