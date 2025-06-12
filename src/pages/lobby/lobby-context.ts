import React from "react";

interface LobbyContextState {
    creating: boolean;
    setCreating: (state:boolean) => void;
}

const LobbyContext = React.createContext<LobbyContextState>({
    creating: false,
    setCreating: () => {},
});

export default LobbyContext;