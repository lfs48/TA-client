import { Ability, AbilityInstance } from "@/types";

export const abilitySkeleton: Ability = {
    id: '',
    title: '',
    anomalyId: '',
    data: {
        title: '',
        description: '',
        success: '',
        additional: '',
        failure: '',
        tri: undefined,
        'question-note': undefined,
        question: undefined,
        answers: undefined,
    },
};

export const abilityInstanceSkeleton: AbilityInstance = {
    id: '',
    abilityId: '',
    agentId: '',
    practiced: false,
    answers: {},
};