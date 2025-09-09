import { Ability } from "@/types";
import parse from 'html-react-parser';

interface AgentAbilityProps {
  ability: Ability;
}

export default function AgentAbility({ ability }: AgentAbilityProps) {

    const {title} = ability;
    const {description, success, additional, failure} = ability.data;
    return (
        <div className="space-y-1">
            <h3 className="text-anomaly-blue">{title}</h3>
            {parse(description)}
            {parse(success)}
            {additional && parse(additional)}
            {parse(failure)}
        </div>
    );
}
