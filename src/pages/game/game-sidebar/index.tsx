import { useCallback, useContext, useMemo, useState } from "react";
import SettingsTab from "./settings-tab";
import { GameSidebarTabs } from "@/enum/game-sidebar-tabs.enum";
import PlayersTab from "./players-tab";
import AgentsTab from "./agents-tab";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import GameContext from "../game-context";

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

export default function GameSidebar() {

    const game = useContext(GameContext).game;
    const userId = useAppSelector(state => state.session.id) ?? '';
    const isGM = userId === game.gmId;

    const [tab, setTab] = useState(GameSidebarTabs.SETTINGS);

    const getActiveTab = useCallback(() => {
        switch(tab) {
            case(GameSidebarTabs.AGENTS):
                return <AgentsTab />;
            case(GameSidebarTabs.SETTINGS):
                return <SettingsTab />;
            case(GameSidebarTabs.PLAYERS):
                return <PlayersTab />;
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