import { 
    Anomaly,
    Game,
    User,
    Reality,
    Competency,
 } from "./index";

export interface Agent {
    id: string;
    name: string;
    gameId: string;
    playerId: string;
    anomalyId?: string;
    realityId?: string;
    competencyId?: string;
}

export type APIAgent = Agent & {
    game: Game;
    player: User;
    anomaly: Anomaly;
    reality: Reality;
    competency: Competency;
}

export interface AgentResponse {
    agent: APIAgent;
}

export interface AgentsResponse {
    agents: APIAgent[];
}

export interface PostAgentRequest {
    agent: Partial<Agent>;
}

export interface PatchAgentRequest {
    agent: Partial<Agent>;
}