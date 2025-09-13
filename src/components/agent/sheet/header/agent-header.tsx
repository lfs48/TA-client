import Button from "@/components/UI/button";
import AgentSheetContext from "../agent-sheet-context";
import { useContext } from "react";
import { ButtonColors, ButtonStyles } from "@/enum";
import confirmReset from "./confirm-reset";
import { useResetAgentMutation } from "@/api/agent.api";

export default function AgentHeader() {

    const { agent } = useContext(AgentSheetContext);
    const { id, name } = agent;

    const [triggerReset, { isLoading }] = useResetAgentMutation();

    const handleConfirmReset = async () => {
        const confirm = await confirmReset({});
        if (confirm) {
            triggerReset(id);
        }
    }

    return (
        <div className="sticky top-0 flex justify-between px-2 py-2 border-b border-b-gray-300 bg-white z-10">
            <h1 className="text-sm text-agency-red pt-2 pl-4">Agent {name}</h1>
            <Button
                style={ButtonStyles.OUTLINE}
                color={ButtonColors.RED}
                onClick={handleConfirmReset}
                buttonClasses="py-1 px-2 text-xs"
                loading={isLoading}
            >
                Mission Reset
            </Button>
        </div>
    );
}