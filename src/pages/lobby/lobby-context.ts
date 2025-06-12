import React from "react";

interface LobbyContextState {
    creating?: boolean;
    setCreating?: React.Dispatch<React.SetStateAction<boolean>>
}

const LobbyContext = React.createContext<LobbyContextState>({});

export default LobbyContext;