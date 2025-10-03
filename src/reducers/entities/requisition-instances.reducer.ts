import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RequisitionInstance, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import { requisitionInstancesApi } from "@/api/requisition-instances.api";

interface RequisitionInstancesState {
  [id: string]: RequisitionInstance;
}

const requisitionInstancesSlice = createSlice({
  name: "requisitionInstances",
  initialState: {} as RequisitionInstancesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(
        isAnyOf(
          requisitionInstancesApi.endpoints.patchRequisitionInstance.matchFulfilled
        ),
        (state, action) => {
          const { requisitionInstance } = action.payload;
          state[requisitionInstance.id] = requisitionInstance;
        }
      )
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getAgent.matchFulfilled,
          agentApi.endpoints.postAgent.matchFulfilled,
        ),
        (state, action) => {
          const { agent } = action.payload;
          if (agent.requisitionInstances) {
            agent.requisitionInstances.forEach((requisitionInstance: RequisitionInstance) => {
              state[requisitionInstance.id] = requisitionInstance;
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
            if (agent.requisitionInstances) {
              agent.requisitionInstances.forEach((requisitionInstance: RequisitionInstance) => {
                state[requisitionInstance.id] = requisitionInstance;
              });
            }
          });
        }
      );
  }
});

// Selectors
export const selectRequisitionInstanceById = createAppSelector(
  [
    (state: RootState) => state.entities.requisitionInstances,
    (_: RootState, id?: string) => id,
  ],
  (requisitionInstances, id) => (id ? requisitionInstances[id] : undefined)
);

export const selectRequisitionInstancesByIds = createAppSelector(
  [
    (state: RootState) => state.entities.requisitionInstances,
    (_: RootState, ids?: string[]) => ids,
  ],
  (requisitionInstances, ids) =>
    ids ? ids.map((id) => requisitionInstances[id]).filter((instance) => instance !== undefined) : []
);

export const selectRequisitionInstancesByAgentId = createAppSelector(
  [
    (state: RootState) => state.entities.requisitionInstances,
    (_: RootState, agentId?: string) => agentId,
  ],
  (requisitionInstances, agentId) =>
    agentId 
      ? Object.values(requisitionInstances).filter((instance: RequisitionInstance) => instance.agentId === agentId)
      : []
);

export const selectRequisitionInstancesByRequisitionId = createAppSelector(
  [
    (state: RootState) => state.entities.requisitionInstances,
    (_: RootState, requisitionId?: string) => requisitionId,
  ],
  (requisitionInstances, requisitionId) =>
    requisitionId 
      ? Object.values(requisitionInstances).filter((instance: RequisitionInstance) => instance.requisitionId === requisitionId)
      : []
);

export default requisitionInstancesSlice.reducer;