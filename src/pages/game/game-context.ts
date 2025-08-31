import React from "react";

interface GameContextState {
    agentId?: string;
    setAgentId: (id: string) => void;
}

const GameContext = React.createContext<GameContextState>({
    agentId: undefined,
    setAgentId: () => {},
});

export default GameContext;