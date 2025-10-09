import AgentSheetContext from "@/components/agent/sheet/agent-sheet-context"
import { useContext } from "react"
import * as S from '../styled';
import AgentRealityTrack from "./agent-reality-track";
import { realitySkeleton } from "@/util/reality.util";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectRealityById } from "@/reducers/entities/realities.reducer";
import AgentRelationships from "./agent-relationships";

export default function AgentReality() {

    const { agent } = useContext(AgentSheetContext);
    const { realityId, trackFilled } = agent;
    const {  id, name, trigger, release, track, matrix } = useAppSelector(state => selectRealityById(state, realityId)) || realitySkeleton;

    return(
        <div>
        <S.Section>
            <AgentRealityTrack
                id={agent.id}
                title={track.title}
                description={track.description}
                trackFilled={trackFilled}
            />
        </S.Section>  
        <S.Section>
            <AgentRelationships />
        </S.Section>
        </div>

    )
}