import { 
    Anomaly,
    Game,
    User,
 } from "./index";

export interface Agent {
    id: string;
    name: string;
    gameId: string;
    playerId: string;
    anomalyId: string;
}

export type APIAgent = Agent & {
    game: Game;
    player: User;
    anomaly: Anomaly;
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