import { useCallback, useMemo, useState } from "react";
import SettingsTab from "./settings-tab";
import { GameSidebarTabs } from "@/enum/game-sidebar-tabs.enum";
import PlayersTab from "./players-tab";
import { Game, RootState } from "@/types";
import { useSelector } from "react-redux";
import AgentsTab from "./agents-tab";

const tabs = {
    [GameSidebarTabs.AGENTS]: {
        label: "Agents",
        gmTab: false,
    },
    [GameSidebarTabs.SETTINGS]: {
        label: "Settings",
        gmTab: true,
    },
    [GameSidebarTabs.PLAYERS]: {
        label: "Players",
        gmTab: true,
    }
};

interface GameSidebarProps {
    game: Game;
}

export default function GameSidebar({
    game,
}: GameSidebarProps) {

    const userId = useSelector((state:RootState) => state.session.id) ?? '';
    const isGM = userId === game.gmId;

    const [tab, setTab] = useState(GameSidebarTabs.SETTINGS);

    const getActiveTab = useCallback(() => {
        switch(tab) {
            case(GameSidebarTabs.AGENTS):
                return <AgentsTab game={game} />;
            case(GameSidebarTabs.SETTINGS):
                return <SettingsTab game={game}/>;
            case(GameSidebarTabs.PLAYERS):
                return <PlayersTab game={game}/>
        }
    }, [tab, game]);

    const activeTab = useMemo(
        ()=>getActiveTab(), 
        [tab]
    );

    const tabButtons = useMemo( () => {
        return Object.entries(tabs)
        .filter(([_, {gmTab}]) => isGM || !gmTab)
        .map(([key, {label}]) => (
            <button
                key={key} 
                className={`w-20 transform -rotate-90 origin-bottom-right cursor-pointer
                    rounded-t-lg border-b-2 ${tab === key ? 'border-b-white bg-white' : 'border-b-agency-red-500 bg-gray-200'}
                    `}
                onClick={()=>setTab(key as GameSidebarTabs)}
            >{label}</button>
        ))
    }, [userId, tab]);

    return(
        <div className="h-screen-minus-nav absolute top-0 right-0 flex">
            <div className="flex flex-col space-y-16">
                {tabButtons}
            </div>
            <div className="w-[20rem] flex flex-col bg-white">
                {activeTab}
            </div>
        </div>
    )
}