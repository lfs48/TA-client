import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectConnectionBonusById } from "@/reducers/entities/connectionBonuses.reducer";
import { selectRelationshipById } from "@/reducers/entities/relationships.reducer";
import SelectBonus from "./select-bonus";
import Checkbox from "@/components/UI/checkbox";
import { usePatchRelationshipMutation } from "@/api/relationship.api";

interface RelationshipBonusProps {
    relationshipId: string;
}

export default function RelationshipBonus({ relationshipId }: 
    RelationshipBonusProps
) {

    const relationship = useAppSelector(state => selectRelationshipById(state, relationshipId));
    const { active, uses, connectionBonusId } = relationship || {};
    const bonus = useAppSelector(state => selectConnectionBonusById(state, connectionBonusId || ''));
    const { maxUses } = bonus || {};

    const [triggerPatch, { isLoading }] = usePatchRelationshipMutation();

    const handleToggleActive = () => {
        triggerPatch({ 
            id: relationshipId,
            body: {
                relationship: {
                    active: !active
                }
            }
        });
    };

    const handleToggleUses = (uses:number) => {
        triggerPatch({ 
            id: relationshipId,
            body: {
                relationship: {
                    uses: uses
                }
            }
        });
    };

    const bonusesUses = uses !== undefined && maxUses !== undefined ? (
        Array.from({ length: maxUses }, (_, index) => (
            <Checkbox
                key={index}
                color='yellow'
                checked={index < uses}
                onChange={() => handleToggleUses(index >= uses ? index + 1 : index)}
                disabled={isLoading}
            />
        ))
    ) : [];

    return(
        <div className="space-y-2">
            <h2 className="text-reality-yellow">Connection Bonus</h2>
            <SelectBonus 
                relationshipId={relationshipId} 
                bonusId={connectionBonusId} 
            />
            {bonus && (
                <div className="space-y-2">
                    <h3 className="text-sm text-reality-yellow">{bonus.title}</h3>
                    <p className="text-sm">{bonus.description}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <Checkbox
                                color='yellow'
                                checked={active}
                                onChange={handleToggleActive}
                                disabled={isLoading}
                            />
                            <p className="w-12 text-sm italic text-right">Active?</p>
                        </div>
                        <div className="flex space-x-2">
                            {bonusesUses}
                            <p className="w-12 text-sm italic text-right">Used?</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}