import AgentRelationship from "./agent-relationship";
import AgentSheetContext from "../agent-sheet-context"
import { useContext, useMemo } from "react"

export default function AgentRelationships() {

    const { agent } = useContext(AgentSheetContext);
    const { relationshipIds } = agent;

    const relationshipCards = useMemo(() => relationshipIds.map(id => (
        <AgentRelationship key={id} agentId={id} />
    )), [relationshipIds]);

    return (
        <div>
            <h1 className="text-xl text-reality-yellow">Relationships</h1>
            <div className="grid grid-cols-3 gap-4">
                {relationshipCards}
            </div>
        </div>
    )
}