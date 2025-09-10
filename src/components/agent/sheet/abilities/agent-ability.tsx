import { Ability } from "@/types";
import { RiCheckFill, RiCloseLargeFill, RiStarFill } from "@remixicon/react";
import * as S from './styled';
import HTMLParser from "@/components/html-parser";

interface AgentAbilityProps {
  ability: Ability;
}

export default function AgentAbility({ ability }: AgentAbilityProps) {

    const {title} = ability;
    const {description, success, additional, failure} = ability.data;
    return (
        <div className="space-y-1 bg-anomaly-blue-100 py-2 rounded">
            <h3 className="text-lg text-anomaly-blue font-bold px-2 border-b border-anomaly-blue-300 pb-1">{title}</h3>
            <div className="px-2">
                <HTMLParser text={description}/>
            </div>
            <S.Section>
                <div className="w-5 pt-[0.2rem]">
                    <RiCheckFill className="size-5 flex-shrink-0 text-anomaly-blue"/>
                </div>
                <p>
                    <HTMLParser text={success}/>
                </p>
            </S.Section>
            {additional && (
                <S.Section>
                    <div className="w-5 pt-[0.4rem]">
                        <RiStarFill className="size-[0.85rem] flex-shrink-0 text-anomaly-blue"/>
                    </div>
                    <p>
                        <HTMLParser text={additional}/>
                    </p>
                </S.Section>
            )}
            <S.Section>
                <div className="w-5  pt-[0.4rem]">
                    <RiCloseLargeFill className="size-[0.85rem] flex-shrink-0 text-agency-red"/>
                </div>
                <p>
                    <HTMLParser text={failure}/>
                </p>
            </S.Section>
        </div>
    );
}
