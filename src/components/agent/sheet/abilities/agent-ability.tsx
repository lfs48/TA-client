import { RiCheckFill, RiCloseLargeFill, RiStarFill } from "@remixicon/react";
import * as S from './styled';
import HTMLParser from "@/components/html-parser";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAbilityInstanceById } from "@/reducers/entities/ability-instances.reducer";
import { selectAbilityById } from "@/reducers/entities/abilities.reducer";
import { abilityInstanceSkeleton, abilitySkeleton } from "@/util/ability.util";
import Checkbox from "@/components/UI/checkbox";
import { usePatchAbilityInstanceMutation } from "@/api/ability-instances.api";

interface AgentAbilityProps {
  id: string;
}

export default function AgentAbility({ id }: AgentAbilityProps) {

    const abilityInstance = useAppSelector(state => selectAbilityInstanceById(state, id));
    const { practiced, abilityId } = abilityInstance || abilityInstanceSkeleton;
    const ability = useAppSelector(state => selectAbilityById(state, abilityId)) || abilitySkeleton;

    if (!ability) return null;

    const {title} = ability;
    const {description, success, additional, failure} = ability.data;

    const [triggerPatch, { isLoading }] = usePatchAbilityInstanceMutation();

    const handleTogglePracticed = (id: string) => {
        const body = {
            id: id,
            data: {
                abilityInstance: {
                    ...abilityInstance,
                    practiced: !practiced,
                }
            }
        };
        triggerPatch(body);
    }

    return (
        <div className="max-h-120 space-y-1 bg-anomaly-blue-100 pb-2 rounded overflow-y-auto scrollbar-thin">
            <div className="sticky top-0 flex justify-between items-center px-2 py-1 border-b border-anomaly-blue-300 pb-1 bg-anomaly-blue-100">
                <h3 className="text-lg text-anomaly-blue font-bold">{title}</h3>
                <div className="flex items-center space-x-1">
                    <Checkbox 
                        checked={practiced} 
                        color='blue'
                        onChange={() => handleTogglePracticed(id)}
                        disabled={isLoading}
                    />
                    <p className="italic text-xs">Practiced?</p>
                </div>
            </div>
            <div className="px-2">
                <HTMLParser text={description}/>
            </div>
            <S.Section>
                <div className="w-5 pt-[0.2rem]">
                    <RiCheckFill className="size-5 flex-shrink-0 text-anomaly-blue"/>
                </div>
                <div>
                    <HTMLParser text={success}/>
                </div>
            </S.Section>
            {additional && (
                <S.Section>
                    <div className="w-5 pt-[0.4rem]">
                        <RiStarFill className="size-[0.85rem] flex-shrink-0 text-anomaly-blue"/>
                    </div>
                    <div>
                        <HTMLParser text={additional}/>
                    </div>
                </S.Section>
            )}
            <S.Section>
                <div className="w-5  pt-[0.4rem]">
                    <RiCloseLargeFill className="size-[0.85rem] flex-shrink-0 text-agency-red"/>
                </div>
                <div>
                    <HTMLParser text={failure}/>
                </div>
            </S.Section>
        </div>
    );
}
