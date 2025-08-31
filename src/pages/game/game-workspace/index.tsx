import AgentSheet from "@/components/agent/sheet";
import GameContext from "../game-context";
import { EntityTypeName } from "@/types";
import { useContext } from "react";
import WorkspaceTabs from "./workspace-tabs";

export default function GameWorkspace() {

    const { openTabs, selectedTab } = useContext(GameContext);

    return (
        <div className="p-6 pr-92 space-y-2">
            <WorkspaceTabs />
            {selectedTab && (
                <>
                    {getEntityComponent(selectedTab, openTabs[selectedTab])}
                </>
            )}
        </div>
    );
}

function getEntityComponent(id:string, type:EntityTypeName) {
    switch(type) {
        case 'agents':
            return <AgentSheet id={id} />;
    }
}