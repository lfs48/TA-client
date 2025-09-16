import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AbilityInstance, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import { abilityInstancesApi } from "@/api/ability-instances.api";

interface AbilityInstancesState {
  [id: string]: AbilityInstance;
}

const abilityInstancesSlice = createSlice({
  name: "abilityInstances",
  initialState: {} as AbilityInstancesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(
        isAnyOf(
          abilityInstancesApi.endpoints.patchAbilityInstance.matchFulfilled,
        ),
        (state, action) => {
          const { abilityInstance } = action.payload;
          state[abilityInstance.id] = abilityInstance;
        }
      )
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getAgent.matchFulfilled,
          agentApi.endpoints.postAgent.matchFulfilled,
        ),
        (state, action) => {
          const { agent } = action.payload;
          if (agent.abilityInstances) {
            agent.abilityInstances.forEach((abilityInstance: AbilityInstance) => {
              state[abilityInstance.id] = abilityInstance;
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
            if (agent.abilityInstances) {
              agent.abilityInstances.forEach((abilityInstance: AbilityInstance) => {
                state[abilityInstance.id] = abilityInstance;
              });
            }
          });
        }
      );
  }
});

// Selectors
export const selectAbilityInstanceById = createAppSelector(
  [
    (state: RootState) => state.entities.abilityInstances,
    (_: RootState, id?: string) => id,
  ],
  (abilityInstances, id) => (id ? abilityInstances[id] : undefined)
);

export const selectAbilityInstancesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.abilityInstances,
    (_: RootState, ids?: string[]) => ids,
  ],
  (abilityInstances, ids) =>
    ids ? ids.map((id) => abilityInstances[id]).filter((instance) => instance !== undefined) : []
);

export const selectAbilityInstancesByAgentId = createAppSelector(
  [
    (state: RootState) => state.entities.abilityInstances,
    (_: RootState, agentId?: string) => agentId,
  ],
  (abilityInstances, agentId) =>
    agentId 
      ? Object.values(abilityInstances).filter((instance: AbilityInstance) => instance.agentId === agentId)
      : []
);

export const selectAbilityInstancesByAbilityId = createAppSelector(
  [
    (state: RootState) => state.entities.abilityInstances,
    (_: RootState, abilityId?: string) => abilityId,
  ],
  (abilityInstances, abilityId) =>
    abilityId 
      ? Object.values(abilityInstances).filter((instance: AbilityInstance) => instance.abilityId === abilityId)
      : []
);

export default abilityInstancesSlice.reducer;