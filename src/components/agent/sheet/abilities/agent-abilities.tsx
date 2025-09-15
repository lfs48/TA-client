import AgentAbility from "./agent-ability";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { useContext, useMemo } from "react";
import { selectAbilitiesByIds } from "@/reducers/entities/abilities.reducer";
import AgentSheetContext from "../agent-sheet-context";

export default function AgentAbilities() {

  const { agent } = useContext(AgentSheetContext);
  const abilityIds = agent?.abilityInstances.map(ai => ai.abilityId) || [];
  const abilities = useAppSelector((state) =>
    selectAbilitiesByIds(state, abilityIds)
  );

  const agentAbilities = useMemo(() => {
    return abilities.map((ability) => (
      <AgentAbility key={ability.id} ability={ability} />
    ));
  }, [abilities]);

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold text-anomaly-blue">Anomaly Abilities</h1>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2">
        {agentAbilities}
      </div>
    </div>
  );
}
