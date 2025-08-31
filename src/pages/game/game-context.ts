import React from "react";
import { EntityTypeName } from "@/types";

interface GameContextState {
    openTabs: {
        [id: string]: EntityTypeName;
    }
    openTab: (id: string, type: EntityTypeName) => void;
    closeTab: (id: string) => void;
    selectedTab: string | null;
    setSelectedTab: (id: string | null) => void;
}

const GameContext = React.createContext<GameContextState>({
    openTabs: {},
    openTab: () => {},
    closeTab: () => {},
    selectedTab: null,
    setSelectedTab: () => {},
});

export default GameContext;