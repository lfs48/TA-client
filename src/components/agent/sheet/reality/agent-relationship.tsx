import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectRelationshipById } from "@/reducers/entities/relationships.reducer";
import { relationshipSkeleton } from "@/util/relationship.util";
import Checkbox from "@/components/UI/checkbox";
import { useMemo, useState } from "react";
import { selectUserById } from "@/reducers/entities/users.reducer";
import RelationshipBonus from "./relationship-bonus";
import { usePatchRelationshipMutation } from "@/api/relationship.api";
import { RiCloseFill, RiFileEditFill, RiPencilFill, RiSaveFill } from "@remixicon/react";
import SelectPlayer from "./select-player";

interface AgentRelationshipsProps {
    agentId: string;
}

export default function AgentRelationship({ agentId }: AgentRelationshipsProps) {

    const relationship = useAppSelector(state => selectRelationshipById(state, agentId));
    const { id: relationshipId, playerId, name, description, active, uses, connection, connectionBonusId } = relationship || relationshipSkeleton;

    const player = useAppSelector(state => selectUserById(state, playerId));
    const playerName = player ? player.username : 'Unassigned';

    const [editing, setEditing] = useState(false);
    const [nameInput, setNameInput] = useState(name);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const [playerInput, setPlayerInput] = useState(playerId);
    const [bonusInput, setBonusInput] = useState(connectionBonusId);

    const [triggerPatch, { isLoading }] = usePatchRelationshipMutation();

    const handleToggleConnection = (connection:number) => {
        triggerPatch({ 
            id: relationshipId,
            body: {
                relationship: {
                    connection: connection
                }
            }
        });
    };

    const connectionBoxes = useMemo(() => (
        Array.from({ length: 9 }, (_, index) => (
            <Checkbox
                showCheckmark={false}
                key={index}
                color='yellow'
                checked={index < connection}
                onChange={() => handleToggleConnection(index >= connection ? index + 1 : index)}
            />
        ))
    ), [connection]);

    const handleCancelEdit = () => {
        setEditing(false);
        setNameInput(name);
        setDescriptionInput(description);
        setPlayerInput(playerId);
        setBonusInput(connectionBonusId);
    }

    return (
        <div className="bg-reality-yellow-100 rounded">
            <div className="sticky top-0 flex justify-between p-2 border-b border-reality-yellow-300">
                {editing ? (
                    <input 
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                ) : (
                    <h2 className="text-reality-yellow">{name}</h2>
                )}
              <div>
                {editing ? (
                    <div className="flex space-x-2">
                        <RiSaveFill />
                        <RiCloseFill onClick={handleCancelEdit} />
                    </div>
                    ) : (
                    <RiPencilFill
                        onClick={() => setEditing(true)}
                    />
                )}
              </div>
            </div>
            <div className="h-72 overflow-y-auto scrollbar-thin">
                <div className="space-y-1 p-2">
                    <h3 className="text-sm text-reality-yellow">Portrayed by</h3>
                    {editing ? (
                        <SelectPlayer />
                    ) : (
                        <p className="text-sm">{playerName}</p>
                    )}
                    <div className="border-b border-reality-yellow-200"></div>
                </div>
                <div className="space-y-1 p-2">
                    <h3 className="text-sm text-reality-yellow">Description</h3>
                   <p className="text-sm">{description}</p>
                   <div className="border-b border-reality-yellow-200"></div> 
                </div>
                <div className="p-2">
                    <RelationshipBonus relationshipId={relationshipId} />
                </div>
            </div>
            <footer className="border-t border-reality-yellow-300 text-xs flex flex-col">
                <div className="flex justify-between p-2">
                    <p className="text-sm italic">Connection</p>
                    <div className="flex items-center space-x-1">
                        {connectionBoxes}
                        <p className="ml-1 font-bold text-base text-reality-yellow">{connection}</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}