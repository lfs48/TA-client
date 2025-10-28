import Select from "@/components/UI/select";
import { useAppSelector } from "@/hooks/useAppSelector.hook"
import { usePatchRelationshipMutation } from "@/api/relationship.api";
import { useCallback } from "react";

interface SelectBonusProps {
    relationshipId: string;
    bonusId?: string;
}

export default function SelectBonus({ 
    relationshipId, 
    bonusId,
 }: SelectBonusProps) {

    const bonuses = useAppSelector(state => state.entities.connectionBonuses);
    const bonusOptions = Object.values(bonuses).map(bonus => ({
        value: bonus.id,
        label: bonus.title
    }));

    const [ triggerPatch, { isLoading } ] = usePatchRelationshipMutation();

    const handleSelect = useCallback((value: string) => {
        const uses = bonuses[value]?.maxUses || undefined;
        triggerPatch({ 
            id: relationshipId, 
            body: { 
                relationship: { 
                    connectionBonusId: value,
                    uses: uses,
                } 
            } 
        });
    }, [ relationshipId, triggerPatch ]);

    return (
        <Select
            searchable
            className="w-full"
            color="yellow"
            options={bonusOptions}
            placeholder="Unassigned"
            value={bonusId}
            onChange={handleSelect}
            disabled={isLoading}
        />
    )
}