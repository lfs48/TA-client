import AgentSheetContext from "../agent-sheet-context";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { useContext, useMemo } from "react";
import { selectCompetencyById } from "@/reducers/entities/competencies.reducer";
import { competencySkeleton } from "@/util/competency.util";
import Checkbox from "@/components/UI/checkbox";
import { usePatchAgentMutation } from "@/api/agent.api";
import { toggleAssessment } from "@/util/agent.util";

export default function AgentAssessment() {

    const { agent } = useContext(AgentSheetContext);
    const competency = useAppSelector(state => selectCompetencyById(state, agent.competencyId)) || competencySkeleton;
    const { assessment } = competency;

    const [triggerPatchAgent, { isLoading }] = usePatchAgentMutation();

    const handleSelect = (questionIndex:number, answerIndex:number) => {
        const data = {
            id: agent.id,
            data: {
                agent: toggleAssessment(agent, questionIndex, answerIndex)
            }
        };
        triggerPatchAgent(data);
    }

    const assessmentItems = useMemo(() => assessment.map(({ question, answers, qas }, i) => (
        <li key={i} className="space-y-1">
            <div className="flex space-x-1 font-bold">
                <p>{i + 1}.</p>
                <p>{question}</p>
            </div>
            <ul className="pl-4 space-y-1">
                {answers.map((answer, j) => (
                    <li key={j} className="flex space-x-2 items-start">
                        <Checkbox 
                            checked={agent.assessment[i] === j}
                            color='red'
                            className="mt-[0.2rem]"
                            disabled={isLoading}
                            onChange={() => handleSelect(i, j)}
                        />
                        <p>{answer} <b className="text-nowrap">{`(+3 ${qas[j]})`}</b></p>
                    </li>
                ))}
            </ul>
        </li>
    )), [agent, assessment]);

    return (
        <div className="space-y-2">
            <h1 className="text-xl text-agency-red">Assessment</h1>
            <ul className="grid grid-cols-3 gap-4">
                {assessmentItems}
            </ul>
        </div>
    );
}