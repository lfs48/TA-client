import AgentSheetContext from "../agent-sheet-context";
import { useContext } from "react";
import AgentRequisition from "./agent-requisition";

export default function AgentRequisitions() {

    const { agent } = useContext(AgentSheetContext);
    const { requisitionInstanceIds } = agent;

    const reqCards = requisitionInstanceIds.map(id => (
        <AgentRequisition key={id} id={id} />
    ));
    return (
        <div>
            <h1 className="text-xl font-bold text-agency-red mb-2">Requisitions</h1>
            <div className="grid grid-cols-3 gap-4">
                {reqCards}
            </div>
        </div>
    );
}