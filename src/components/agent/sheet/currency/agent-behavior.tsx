import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectCompetencyById } from "@/reducers/entities/competencies.reducer";
import AgentSheetContext from "../agent-sheet-context";
import { useContext } from "react";

export default function AgentBehavior() {

    const { agent } = useContext(AgentSheetContext);
    const competency = useAppSelector(state => selectCompetencyById(state, agent?.competencyId || ''));
    const directive = competency?.directives[agent?.directive || 0] || '';
    
    const sanctioned = competency?.sanctioned.map((s, i) => (
        <li key={i} className="flex items-center space-x-2">
            <input type="checkbox" checked={agent?.sanctioned[i]} readOnly />
            <span>{s}</span>
        </li>
    ));

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-bold">Prime Directive</h3>
                <span>{directive}</span>
            </div>
            <div>
                <h3 className="text-lg font-bold">Sanctioned Behaviors</h3>
                <ul className="list-inside list-none">
                    {sanctioned}
                </ul>
            </div>
        </div>
    )
}