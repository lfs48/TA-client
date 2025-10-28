import { Agent, ConnectionBonus, User } from "./index.ts";

export interface Relationship {
    id: string;
    name: string;
    description?: string;
    connection: number;
    active: boolean;
    uses?: number;
    agentId: string;
    playerId: string;
    connectionBonusId?: string;
}

export interface APIRelationship extends Relationship {
    agent: Agent;
    player: User;
    connectionBonus?: ConnectionBonus;
}