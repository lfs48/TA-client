import { Competency } from "@/types";

export const competencySkeleton: Competency = {
    id: '',
    name: '',
    directives: [],
    sanctioned: [],
    assessment: [{
        question: '',
        answers: [],
        qas: [],
    }],
    requisitionId: '',
};