import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Agent, APIAgent, RootState } from "@/types";
import { agentApi } from "@/api/agent.api";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import gameApi from "@/api/game.api";

interface AgentsState {
  [id: string]: Agent;
}

const agentsSlice = createSlice({
  name: "agents",
  initialState: {} as AgentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(
        isAnyOf(
          agentApi.endpoints.getAgent.matchFulfilled,
          agentApi.endpoints.postAgent.matchFulfilled,
          agentApi.endpoints.patchAgent.matchFulfilled,
          agentApi.endpoints.adjustCurrentQuality.matchFulfilled,
          agentApi.endpoints.adjustMaxQuality.matchFulfilled,
        ),
        (state, action) => {
          const { agent } = action.payload;
          state[agent.id] = stripAgentRelations(agent);
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
            state[agent.id] = stripAgentRelations(agent);
          });
        }
      )
      .addMatcher(
        isAnyOf(
          gameApi.endpoints.getGameById.matchFulfilled,
          gameApi.endpoints.getGameByPassphrase.matchFulfilled,
        ),
        (state, action) => {
          const { agents } = action.payload.game;
          agents.forEach(
            (agent) => {
              state[agent.id] = agent;
            }
          );
        }
      )
      .addMatcher(
        isAnyOf(
          gameApi.endpoints.getUserGames.matchFulfilled,
        ),
        (state, action) => {
          const { games } = action.payload;
          games.forEach((game) => {
            game.agents.forEach((agent) => {
              state[agent.id] = agent;
            });
          });
        }
      )
  }
});

// Selectors
export const selectAgentById = createAppSelector(
  [
    (state: RootState) => state.entities.agents,
    (_: RootState, id?: string) => id,
  ],
  (agents, id) => (id ? agents[id] : undefined)
);

export const selectAgentsByIds = createAppSelector(
  [
    (state: RootState) => state.entities.agents,
    (_: RootState, ids?: string[]) => ids,
  ],
  (agents, ids) =>
    ids ? ids.map((id) => agents[id]).filter((agent) => agent !== undefined) : []
);

export default agentsSlice.reducer;

function stripAgentRelations(agent: APIAgent): Agent {
  const { game, player, ...rest } = agent;
  return rest;
}