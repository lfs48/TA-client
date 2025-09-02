import { useSelector } from "react-redux";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import { RootState } from "@/types";

interface AgentSheetHeaderProps {
    id: string;
}

export default function AgentHeader({ id }: AgentSheetHeaderProps) {

    const agent = useSelector((state: RootState) => selectAgentById(state, id));
    
    return (
        <div>
            <h2 className='text-lg font-semibold'>Agent {agent?.name}</h2>
        </div>
    );
}