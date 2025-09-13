
import * as S from "./styled";
import AgentBio from "./bio/agent-bio";
import AgentQualities from "./qualities/agent-qualities";
import AgentCurrency from "./currency/agent-currency";
import AgentAbilities from "./abilities/agent-abilities";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import AgentHeader from "./header/agent-header";
import AgentBehavior from "./behavior/agent-behavior";

interface AgentSheetProps {
    id: string;
};

export default function AgentSheet({ id }: AgentSheetProps) {

    const agent = useAppSelector((state) => selectAgentById(state, id));
    const abilityIds = agent?.abilityInstances.map(ai => ai.abilityId) || [];
    return (
        <div className='h-[calc(100vh-9rem)] flex flex-col bg-white rounded shadow-lg overflow-y-auto scrollbar-thin'>
            <AgentHeader name={agent?.name || ''} />
            <S.Section>
                <AgentBio id={id} />
            </S.Section>
            <S.Section>
                <AgentQualities id={id} />
            </S.Section>
            <S.Section>
                <AgentCurrency id={id} />
            </S.Section>
            <S.Section>
                <AgentAbilities abilityIds={abilityIds || []} />
            </S.Section>
        </div>
    );
}