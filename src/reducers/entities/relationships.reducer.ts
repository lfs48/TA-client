import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Relationship, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";

interface RelationshipsState {
  [id: string]: Relationship;
}

const relationshipsSlice = createSlice({
  name: "relationships",
  initialState: {} as RelationshipsState,
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
          if (agent.relationships) {
            agent.relationships.forEach((relationship: Relationship) => {
              state[relationship.id] = relationship;
            });
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
            if (agent.relationships) {
              agent.relationships.forEach((relationship: Relationship) => {
                state[relationship.id] = relationship;
              });
            }
          });
        }
      );
  }
});

// Selectors
export const selectRelationshipById = createAppSelector(
  [
    (state: RootState) => state.entities.relationships,
    (_: RootState, id?: string) => id,
  ],
  (relationships, id) => (id ? relationships[id] : undefined)
);

export const selectRelationshipsByIds = createAppSelector(
  [
    (state: RootState) => state.entities.relationships,
    (_: RootState, ids?: string[]) => ids,
  ],
  (relationships, ids) =>
    ids ? ids.map((id) => relationships[id]).filter((relationship) => relationship !== undefined) : []
);

export const selectRelationshipsByAgentId = createAppSelector(
  [
    (state: RootState) => state.entities.relationships,
    (_: RootState, agentId?: string) => agentId,
  ],
  (relationships, agentId) =>
    agentId 
      ? Object.values(relationships).filter((relationship: Relationship) => relationship.agentId === agentId)
      : []
);

export const selectActiveRelationshipsByAgentId = createAppSelector(
  [
    (state: RootState) => state.entities.relationships,
    (_: RootState, agentId?: string) => agentId,
  ],
  (relationships, agentId) =>
    agentId 
      ? Object.values(relationships).filter((relationship: Relationship) => 
          relationship.agentId === agentId && relationship.active
        )
      : []
);

export default relationshipsSlice.reducer;