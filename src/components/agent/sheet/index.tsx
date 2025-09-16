
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
import { useState } from "react";
import { AgentSheetTab } from "@/types";
import AgentAssessment from "./competency/agent-assessment";

interface AgentSheetProps {
    id: string;
};

export default function AgentSheet({ id }: AgentSheetProps) {

    const [tab, setTab] = useState<AgentSheetTab>('overview');
    const agent = useAppSelector((state) => selectAgentById(state, id)) || agentSkeleton;
    const abilityIds = agent?.abilityInstances.map(ai => ai.abilityId) || [];
    return (
        <AgentSheetContext.Provider value={{ agent: agent, tab: tab, setTab: setTab }}>
            <div className='h-[calc(100vh-9rem)] flex flex-col bg-white rounded shadow-lg overflow-y-auto scrollbar-thin'>
                <AgentHeader />
                {sheetContent(tab)}
            </div>
        </AgentSheetContext.Provider>
    );
}

function sheetContent(tab: AgentSheetTab) {
    switch(tab) {
        case 'overview':
            return (
                <>
                    <S.Section>
                       <AgentBio /> 
                    </S.Section>
                    <S.Section>
                       <AgentQualities />
                    </S.Section>
                    <S.Section>
                       <AgentCurrency />
                    </S.Section>
                </>
            );
        case 'anomaly':
            return(
                <S.Section>
                    <AgentAbilities />
                </S.Section>
            );
        case 'competency':
            return(
                <S.Section>
                    <AgentAssessment />
                </S.Section>
            );
    }
}
