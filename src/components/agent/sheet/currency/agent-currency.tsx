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
            <h2 className="text-xl">Emotional Currency</h2>
            <div className="flex space-x-4">
                <div className="flex flex-col space-y-2">
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
                <AgentBehavior />
            </div>
        </div>
    );
}
