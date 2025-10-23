import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectRelationshipById } from "@/reducers/entities/relationships.reducer";
import { relationshipSkeleton } from "@/util/relationship.util";
import Checkbox from "@/components/UI/checkbox";
import { useMemo } from "react";
import { selectUserById } from "@/reducers/entities/users.reducer";

interface AgentRelationshipsProps {
    id: string;
}

export default function AgentRelationship({ id }: AgentRelationshipsProps) {

    const relationship = useAppSelector(state => selectRelationshipById(state, id));
    const { id: relationshipId, agentId, playerId, name, description, active, uses, connection } = relationship || relationshipSkeleton;

    const player = useAppSelector(state => selectUserById(state, playerId));
    const playerName = player ? player.username : 'Unassigned';

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
            <h2 className="sticky top-0 flex p-2 text-reality-yellow border-b border-reality-yellow-200">
                <p className="basis-2/3 self-center pr-2 border-r border-reality-yellow-200">{name}</p>
                <div className="basis-1/3 flex flex-col pl-2 justify-self-end">
                    <p className="text-xs">Portrayed by</p>
                    <p className="text-sm">{playerName}</p>
                </div>
            </h2>
            <div className="h-72 p-2 overflow-y-auto scrollbar-thin">
                <p className="p-2 text-sm">{description}</p>
            </div>
            <footer className="sticky bottom-0 border-t border-reality-yellow-200 text-xs flex flex-col">
                <div className="flex justify-between p-2 border-b border-reality-yellow-200">
                    <p className="text-sm italic">Bonus</p>
                    <div className="flex space-x-4">
                        <div className="flex space-x-1 items-center">
                            <Checkbox
                                color='yellow'
                                checked={active}
                                onChange={() => {}}
                            />
                            <p className="text-sm italic">Active?</p>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <Checkbox
                                color='yellow'
                                checked={uses === 0}
                                onChange={() => {}}
                            />
                            <p className="text-sm italic">Used?</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <p className="text-sm italic">Connection</p>
                    <div className="flex space-x-1">
                        {connectionBoxes}
                    </div>
                </div>
            </footer>
        </div>
    )
}