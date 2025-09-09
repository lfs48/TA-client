import { Anomaly } from "types/Anomaly.type";

export interface Ability {
    id: string;
    title: string;
    anomalyId: string;
    data: AbilityData;
}

export interface AbilityData {
    title: string;
    description: string;
    success: string;
    additional?: string;
    failure: string;
    tri?: string;
    'question-note'?: string;
    question?: string;
    answers?: AbilityAnswers;
}

export interface AbilityAnswers {
    [key: string]: string;
}

export interface AbilityInstance {
    id: string;
    abilityId: string;
    agentId: string;
    practiced: boolean;
    answers: AbilityInstanceAnswers;
}

export interface AbilityInstanceAnswers {
    [key: string]: number;
}

export interface APIAbility extends Ability {
    anomaly: Anomaly;
}