import React from "react";
import { Game, EntityTypeName } from "@/types";
import { gameSkeleton } from "@/util/game.util";

interface GameContextState {
    game: Game;
    openTabs: {
        [id: string]: EntityTypeName;
    }
    openTab: (id: string, type: EntityTypeName) => void;
    closeTab: (id: string) => void;
    selectedTab: string | null;
    setSelectedTab: (id: string | null) => void;
}

const GameContext = React.createContext<GameContextState>({
    game: gameSkeleton,
    openTabs: {},
    openTab: () => {},
    closeTab: () => {},
    selectedTab: null,
    setSelectedTab: () => {},
});

export default GameContext;