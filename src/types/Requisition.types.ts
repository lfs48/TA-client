import { Agent } from "./index.ts";

export interface Requisition {
    id: string;
    title: string;
    description: string;
    cost: number;
    rentalCost?: number;
    uses?: number;
}

export interface RequisitionInstance {
    id: string;
    requisitionId: string;
    agentId: string;
    currentUses: number;
    maxUses: number;
    notes?: string;
    rented: boolean;
    quantity: number;
}

export interface APIRequisitionInstance extends RequisitionInstance {
    agent: Agent;
    requisition: Requisition;
}