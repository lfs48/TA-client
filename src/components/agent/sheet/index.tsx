
import * as S from "./styled";
import AgentBio from "./bio/agent-bio";
import AgentQualities from "./qualities/agent-qualities";
import AgentCurrency from "./currency/agent-currency";

interface AgentSheetProps {
    id: string;
};

export default function AgentSheet({ id }: AgentSheetProps) {

    return (
        <div className='flex flex-col bg-white rounded shadow-lg'>
            <h1 className="text-sm text-agency-red pt-2 pl-4">Agent</h1>
            <S.Section>
                <AgentBio id={id} />
            </S.Section>
            <S.Section>
                <AgentQualities id={id} />
            </S.Section>
            <S.Section>
                <AgentCurrency id={id} />
            </S.Section>
        </div>
    );
}