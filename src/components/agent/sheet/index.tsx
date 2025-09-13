
import * as S from "./styled";
import AgentBio from "./bio/agent-bio";
import AgentQualities from "./qualities/agent-qualities";
import AgentCurrency from "./currency/agent-currency";
import AgentAbilities from "./abilities/agent-abilities";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import AgentHeader from "./header/agent-header";
import AgentSheetContext from "./agent-sheet-context";
import { agentSkeleton } from "@/util/agent.util";

interface AgentSheetProps {
    id: string;
};

export default function AgentSheet({ id }: AgentSheetProps) {

    const agent = useAppSelector((state) => selectAgentById(state, id)) || agentSkeleton;
    const abilityIds = agent?.abilityInstances.map(ai => ai.abilityId) || [];
    return (
        <AgentSheetContext.Provider value={{ agent: agent }}>
            <div className='h-[calc(100vh-9rem)] flex flex-col bg-white rounded shadow-lg overflow-y-auto scrollbar-thin'>
                <AgentHeader name={agent?.name || ''} />
                <S.Section>
                    <AgentBio />
                </S.Section>
                <S.Section>
                    <AgentQualities />
                </S.Section>
                <S.Section>
                    <AgentCurrency />
                </S.Section>
                <S.Section>
                    <AgentAbilities abilityIds={abilityIds || []} />
                </S.Section>
            </div>
        </AgentSheetContext.Provider>
    );
}