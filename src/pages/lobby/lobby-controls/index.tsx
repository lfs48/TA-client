import { useContext } from "react";

import Button from "@/components/UI/button";
import LobbyContext from "../lobby-context";
import { ButtonColors, ButtonStyles } from "@/enum";

export default function LobbyControls() {

    const {creating, setCreating} = useContext(LobbyContext);

    const handleNewGame = () => {
        setCreating(true);
    }

    return (
        <div className='w-full flex justify-between items-center px-4 py-2 bg-white rounded'>
            <h1 className='text-agency-red text-[1.75rem] leading-none'>Games</h1>
            <Button
                color={ButtonColors.PURPLE}
                style={ButtonStyles.FILL}
                buttonClasses='w-[10.5rem] px-2 py-1'
                onClick={handleNewGame}
                disabled={creating}
            >New Game
            </Button>
        </div>
    );
}