import { Game } from "types/Game.types";
import { User } from "types/User.types";

export interface Agent {
    id: string;
    name: string;
    gameId: string;
    playerId: string;
}

export type APIAgent = Agent & {
    game: Game;
    player: User;
}

export interface AgentResponse {
    agent: APIAgent;
}

export interface AgentsResponse {
    agents: APIAgent[];
}

export interface PostAgentRequest {
    agent: Agent;
}