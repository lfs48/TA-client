import React from "react";

interface LandingContextState {
    errors: string[];
    setErrors: (state:string[]) => void;
}

const LobbyContext = React.createContext<LandingContextState>({
    errors: [],
    setErrors: () => {},
});

export default LobbyContext;