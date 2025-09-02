
import * as S from "./styled";
import AgentBio from "./agent-bio";
import AgentQualities from "./qualities/agent-qualities";

interface AgentSheetProps {
    id: string;
};

export default function AgentSheet({ id }: AgentSheetProps) {

    return (
        <div className='bg-white rounded shadow-lg'>
            <S.Section>
                <AgentBio id={id} />
            </S.Section>
            <S.Section>
                <AgentQualities id={id} />
            </S.Section>
        </div>
    );
}