import { Requisition } from "types/Requisition.types";

export interface Competency {
    id: string;
    name: string;
    directives: string[];
    sanctioned: string[];
    assessment: CompetencyAssessment[];
    requisitionId: string;
}

export interface APICompetency extends Competency {
    requisition: Requisition;
}

export interface CompetencyAssessment {
    question: string;
    answers: string[];
    qas: string[];
}