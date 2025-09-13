import QualityBar from "./quality-bar";
import { Qualities } from "@/enum";
import { useContext } from "react";
import AgentSheetContext from "../agent-sheet-context";

export default function AgentQualities() {

    const { agent } = useContext(AgentSheetContext);
    const { id, qualities } = agent;

    const bars = Object.values(Qualities).map((quality) => {
        const { current, max } = qualities[quality];
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
