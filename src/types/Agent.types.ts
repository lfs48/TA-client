import { QUALITIES } from "constants/qualities.constant";
import { Qualities } from "enum";

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
    qualities: AgentQualities;
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

export interface AgentQuality {
    current: number;
    max: number;
}

export type AgentQualities = Record<Qualities, AgentQuality>;