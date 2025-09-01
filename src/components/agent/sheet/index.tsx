
import AgentBio from "./agent-bio";
import AgentQualities from "./qualities/agent-qualities";

interface AgentSheetProps {
    id: string;
};

export default function AgentSheet({ id }: AgentSheetProps) {

    return (
        <div className='bg-white p-4 rounded shadow-lg'>
            <AgentBio id={id} />
            <AgentQualities id={id}/>
        </div>
    );
}