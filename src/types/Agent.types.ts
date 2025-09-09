import { Qualities } from "@/enum";

import { 
    AbilityInstance,
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
    currency: AgentCurrencies;
    abilityInstanceIds: string[];
    abilityInstances: AbilityInstance[];
}

export type APIAgent = Agent & {
    game: Game;
    player: User;
    anomaly: Anomaly;
    reality: Reality;
    competency: Competency;
    abilityInstances: AbilityInstance[];
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

export interface PatchQualityRequest {
    quality: Qualities;
    quantity: number;
}

export type Currency = 'commendations' | 'demerits';

export interface AgentCurrency {
    current: number;
    banked: number;
    spent: number;
}

export interface AgentCurrencies {
    commendations: AgentCurrency;
    demerits: AgentCurrency;
}

export interface PatchCurrencyRequest {
    currency: Currency;
    quantity: number;
}

export interface ResetCurrencyRequest {
    currency: Currency;
}