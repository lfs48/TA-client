import { Ability } from "./Ability.types";

export interface Anomaly {
    id: string;
    name: string;
    abilityIds: string[];
}

export type APIAnomaly = Anomaly &{
    abilities: Ability[];
}