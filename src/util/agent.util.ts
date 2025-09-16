import { Agent } from "@/types";
import { Qualities } from "@/enum";

export const agentSkeleton: Agent = {
    id: '',
    name: 'Loading...',
    gameId: '',
    playerId: '',
    anomalyId: undefined,
    realityId: undefined,
    competencyId: undefined,
    qualities: {
        [Qualities.ATN]: { current: 0, max: 0 },
        [Qualities.DUP]: { current: 0, max: 0 },
        [Qualities.DYN]: { current: 0, max: 0 },
        [Qualities.EMP]: { current: 0, max: 0 },
        [Qualities.INIT]: { current: 0, max: 0 },
        [Qualities.PER]: { current: 0, max: 0 },
        [Qualities.PRE]: { current: 0, max: 0 },
        [Qualities.PRO]: { current: 0, max: 0 },
        [Qualities.SUB]: { current: 0, max: 0 },
    },
    currency: {
        commendations: { current: 0, banked: 0, spent: 0 },
        demerits: { current: 0, banked: 0, spent: 0 },
    },
    abilityInstanceIds: [],
    directive: 0,
    sanctioned: [false, false, false, false, false, false, false, false, false],
    assessment: [0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export function toggleSanctioned(agent:Agent, index:number):Agent {
    const newSanctioned = [...agent.sanctioned];
    newSanctioned[index] = !newSanctioned[index];
    return {
        ...agent,
        sanctioned: newSanctioned
    };
};

export function toggleAssessment(agent:Agent, index:number, answerIndex:number):Agent {
    const newAssessment = [...agent.assessment];
    newAssessment[index] = newAssessment[index] === answerIndex ? 0 : answerIndex;
    return {
        ...agent,
        assessment: newAssessment
    };
}