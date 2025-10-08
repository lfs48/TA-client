import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectRelationshipById } from "@/reducers/entities/relationships.reducer";
import { relationshipSkeleton } from "@/util/relationship.util";
import Checkbox from "@/components/UI/checkbox";
import { useMemo } from "react";

interface AgentRelationshipsProps {
    id: string;
}

export default function AgentRelationship({ id }: AgentRelationshipsProps) {

    const relationship = useAppSelector(state => selectRelationshipById(state, id));
    const { id: relationshipId, agentId, name, description, active, uses, connection } = relationship || relationshipSkeleton;

    const connectionBoxes = useMemo(() => (
        Array.from({ length: 9 }, (_, index) => (
            <Checkbox
                key={index}
                color='yellow'
                checked={index < connection}
                onChange={() => {}}
            />
        ))
    ), [connection]);

    return (
        <div className="bg-reality-yellow-100 rounded">
            <h2 className="sticky top-0 p-2 text-reality-yellow border-b border-reality-yellow-200">{name}</h2>
            <div className="h-80 p-2 overflow-y-auto scrollbar-thin">
                <p className="p-2 text-sm">{description}</p>
            </div>
            <footer className="sticky bottom-0 p-2 border-t border-reality-yellow-200 text-xs flex justify-between items-center">
                <p className="text-sm italic">Connection</p>
                <div className="flex space-x-1">
                    {connectionBoxes}
                </div>
            </footer>
        </div>
    )
}