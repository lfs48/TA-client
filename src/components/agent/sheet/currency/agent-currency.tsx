import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import { Agent } from "@/types";
import CurrencySection from "./currency-section";

interface AgentCurrencyProps {
    id: string;
}

export default function AgentCurrency({
    id,
}: AgentCurrencyProps) {

    const agent = useAppSelector(state => selectAgentById(state, id)) as Agent;
    const {commendations, demerits} = agent?.currency;

    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-xl">Emotional Currency</h2>
            <div className="grid grid-cols-2 gap-4">
                <CurrencySection
                    id={id}
                    currency="commendations"
                    current={commendations.current}
                    banked={commendations.banked}
                    spent={commendations.spent}
                />
                <CurrencySection
                    id={id}
                    currency="demerits"
                    current={demerits.current}
                    banked={demerits.banked}
                    spent={demerits.spent}
                />
            </div>
        </div>
    );
}
