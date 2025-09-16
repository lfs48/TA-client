import AgentAbility from "./agent-ability";
import { useContext, useMemo } from "react";
import AgentSheetContext from "../agent-sheet-context";

export default function AgentAbilities() {

  const { agent } = useContext(AgentSheetContext);
  const { abilityInstanceIds } = agent;

  const agentAbilities = useMemo(() => {
    return abilityInstanceIds.map((id) => (
      <AgentAbility key={id} id={id} />
    ));
  }, [abilityInstanceIds]);

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold text-anomaly-blue">Anomaly Abilities</h1>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        {agentAbilities}
      </div>
    </div>
  );
}
