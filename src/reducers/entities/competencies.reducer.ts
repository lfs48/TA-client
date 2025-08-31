import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Competency, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import competenciesApi from "@/api/competencies.api";
import arcsApi from "@/api/arcs.api";

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
      .addMatcher(competenciesApi.endpoints.getCompetencies.matchFulfilled, (state, action) => {
        const { competencies } = action.payload;
        competencies.forEach((competency: Competency) => {
          state[competency.id] = competency;
        });
      })
      .addMatcher(arcsApi.endpoints.getARCs.matchFulfilled, (state, action) => {
        const { competencies } = action.payload;
        competencies.forEach((competency: Competency) => {
          state[competency.id] = competency;
        });
      })
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