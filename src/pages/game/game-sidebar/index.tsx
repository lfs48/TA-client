import { useCallback, useMemo, useState } from "react";
import SettingsTab from "./settings-tab";
import { GameSidebarTabs } from "@/enum/game-sidebar-tabs.enum";
import PlayersTab from "./players-tab";
import { Game } from "@/types";

const TAB_LABELS = {
    [GameSidebarTabs.SETTINGS]: "Settings",
    [GameSidebarTabs.PLAYERS]: "Players",
};

interface GameSidebarProps {
    game: Game;
}

export default function GameSidebar({
    game,
}: GameSidebarProps) {

    const [tab, setTab] = useState(GameSidebarTabs.SETTINGS);
    
    const getActiveTab = useCallback(() => {
        switch(tab) {
            case(GameSidebarTabs.SETTINGS):
                return <SettingsTab game={game}/>;
            case(GameSidebarTabs.PLAYERS):
                return <PlayersTab game={game}/>
        }
    }, [tab]);

    const activeTab = useMemo(
        ()=>getActiveTab(), 
        [tab, getActiveTab]
    );

    const tabButtons = useMemo( () => {
        return Object.keys(TAB_LABELS).map(key => (
            <button
                key={key} 
                className={`w-20 transform -rotate-90 origin-bottom-right cursor-pointer
                    rounded-t-lg border-b-2 ${tab === key ? 'border-b-white bg-white' : 'border-b-agency-red-500 bg-gray-200'}
                    `}
                onClick={()=>setTab(key as GameSidebarTabs)}
            >{TAB_LABELS[key]}</button>
        ))
    }, [tab]);

    return(
        <div className="h-screen-minus-nav absolute top-0 right-0 flex">
            <div className="flex flex-col space-y-16">
                {tabButtons}
            </div>
            <div className="w-[25rem] bg-white">
                {activeTab}
            </div>
        </div>
    )
}