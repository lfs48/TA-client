import { RiCheckFill, RiCloseLargeFill, RiStarFill } from "@remixicon/react";
import * as S from './styled';
import HTMLParser from "@/components/html-parser";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAbilityInstanceById } from "@/reducers/entities/ability-instances.reducer";
import { selectAbilityById } from "@/reducers/entities/abilities.reducer";
import { abilityInstanceSkeleton, abilitySkeleton } from "@/util/ability.util";
import Checkbox from "@/components/UI/checkbox";
import { usePatchAbilityInstanceMutation } from "@/api/ability-instances.api";
import { useMemo } from "react";
import Triangle from "@/components/svg/triangle";

interface AgentAbilityProps {
  id: string;
}

export default function AgentAbility({ id }: AgentAbilityProps) {

    const abilityInstance = useAppSelector(state => selectAbilityInstanceById(state, id))  || abilityInstanceSkeleton;
    const { practiced, abilityId } = abilityInstance;
    const ability = useAppSelector(state => selectAbilityById(state, abilityId)) || abilitySkeleton;

    if (!ability) return null;

    const {title} = ability;
    const {description, success, additional, failure, "question-note": questionNote, question, answers} = ability.data;

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

    const abilityAnswers = useMemo(() => {
        if (!answers) return null;
        return Object.entries(answers).map(([key, answer]) => (
            <div key={key} className="flex space-x-2">
                <b>A: </b>
                <div className="flex flex-col space-y-0.5">
                    <HTMLParser text={answer} />
                    <div className="flex space-x-1 items-center">
                        {[...Array(3).keys()].map(i => (
                            <Checkbox key={i} checked={abilityInstance.answers[key] >= i + 1} />
                        ))}
                        <p className="text-lg text-anomaly-blue font-bold">{key}</p>
                    </div>
                </div>
            </div>
        ));
    }, [answers]);

    return (
        <div className="space-y-1 bg-anomaly-blue-100 pb-2 rounded">
            <div className="sticky top-0 flex justify-between items-center px-2 py-1 border-b border-anomaly-blue-300 pb-1 bg-anomaly-blue-100">
                <h3 className="text-lg text-anomaly-blue font-bold">{title}</h3>
            </div>
            <div className="h-80 overflow-y-auto scrollbar-thin">
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
                { question && (
                    <div className="w-full px-4 py-2">
                        <div className="w-full border-b border-anomaly-blue-200"></div>
                    </div>
                )}
                <S.Section>
                    <div>
                        <div>
                        <div className="space-y-0.5">
                            {questionNote && <p className="italic text-xs mb-1">{questionNote}</p>}
                            {question && (
                                <div className="flex space-x-2">
                                    <b>Q: </b>
                                    <div>
                                        <HTMLParser text={question} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {abilityAnswers}
                    </div>
                </S.Section>
            </div>
            <div className="sticky bottom-0 h-8 px-2 py-2 bg-anomaly-blue-100 border-t border-anomaly-blue-300">
                <div className="flex justify-end items-center space-x-1">
                    <Checkbox 
                        checked={practiced} 
                        color='blue'
                        onChange={() => handleTogglePracticed(id)}
                        disabled={isLoading}
                    />
                    <p className="italic text-xs">Practiced?</p>
                </div>
            </div>
        </div>
    );
}
