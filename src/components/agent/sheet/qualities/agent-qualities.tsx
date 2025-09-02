import { useSelector } from "react-redux";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import { Agent, RootState } from "@/types";
import QualityBar from "./quality-bar";
import { Qualities } from "@/enum";

interface AgentQualitiesProps {
    id: string;
}

export default function AgentQualities({ id }: AgentQualitiesProps) {

    const agent = useSelector((state: RootState) => selectAgentById(state, id)) as Agent;

    const bars = Object.values(Qualities).map((quality) => {
        const { current, max } = agent.qualities[quality] || { current: 0, max: 0 };
        return (
            <QualityBar
                key={quality}
                quality={quality}
                current={current}
                max={max}
                agentId={id}
            />
        );
    });

    return (
        <div className="space-y-2">
            <h2 className="text-xl">Quality Assurances</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {bars}  
            </div>
        </div>
    );
}
