import { Agent } from "./index.ts";

export interface Relationship {
    id: string;
    name: string;
    description?: string;
    connection: number;
    active: boolean;
    uses?: number;
    agentId: string;
}

export interface APIRelationship extends Relationship {
    agent: Agent;
}