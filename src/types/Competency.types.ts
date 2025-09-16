export interface Competency {
    id: string;
    name: string;
    directives: string[];
    sanctioned: string[];
    assessment: CompetencyAssessment[];
}

export interface CompetencyAssessment {
    question: string;
    answers: string[];
    qas: string[];
}