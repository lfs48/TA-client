import { Requisition, RequisitionInstance } from "@/types";

export const requisitionSkeleton: Requisition = {
    id: '',
    title: '',
    description: '',
    cost: 0,
    rentalCost: undefined,
    uses: undefined,
};

export const requisitionInstanceSkeleton: RequisitionInstance = {
    id: '',
    requisitionId: '',
    agentId: '',
    currentUses: 0,
    maxUses: 0,
    notes: undefined,
    rented: false,
    quantity: 1,
};