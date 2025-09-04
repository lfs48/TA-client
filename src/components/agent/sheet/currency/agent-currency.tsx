import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import { Agent, Currency } from "@/types";
import { 
    useEarnCurrencyMutation, 
    useResetAgentCurrencyMutation, 
    useSpendCurrencyMutation 
} from "@/api/agent.api";
import { useState } from "react";
import CurrencySection from "./currency-section";

interface AgentCurrencyProps {
    id: string;
}

export default function AgentCurrency({
    id,
}: AgentCurrencyProps) {

    const agent = useAppSelector(state => selectAgentById(state, id)) as Agent;
    const {commendations, demerits} = agent?.currency;

    const [commInput, setCommInput] = useState(0);
    const [demInput, setDemInput] = useState(0);

    const [triggerEarn, {isLoading: earnLoading}] = useEarnCurrencyMutation();
    const [triggerSpend, {isLoading: spendLoading}] = useSpendCurrencyMutation();
    const [triggerReset, {isLoading: resetLoading}] = useResetAgentCurrencyMutation();

    const loading = earnLoading || spendLoading || resetLoading;

    const handleTransaction = async (type: 'earn' | 'spend', currency: Currency, quantity: number) => {
        const data = { currency, quantity };
        if (type === 'earn') {
            await triggerEarn({ id, data });
        } else {
            await triggerSpend({ id, data });
        }
        currency === 'commendations' ? setCommInput(0) : setDemInput(0);
    };

    const handleReset = async (currency: Currency) => {
        if (!loading) {
            await triggerReset({ id, data: { currency } });
        }
    };

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
