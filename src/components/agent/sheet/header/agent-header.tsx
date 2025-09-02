import { selectAgentById } from "@/reducers/entities/agent.reducer";
import { useAppSelector } from "@/hooks/useAppSelector.hook";

interface AgentSheetHeaderProps {
    id: string;
}

export default function AgentHeader({ id }: AgentSheetHeaderProps) {

    const agent = useAppSelector(state => selectAgentById(state, id));
    
    return (
        <div>
            <h2 className='text-lg font-semibold'>Agent {agent?.name}</h2>
        </div>
    );
}