import CurrencySection from "./currency-section";
import AgentBehavior from "./agent-behavior";
import AgentSheetContext from "../agent-sheet-context";
import { useContext } from "react";

export default function AgentCurrency() {

    const { agent } = useContext(AgentSheetContext);
    const { id, currency } = agent;
    const { commendations, demerits } = currency;

    return (
        <div>
            <div className="flex space-x-8">
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
                <AgentBehavior />
            </div>
        </div>
    );
}
