import LobbyContext from "../lobby-context";
import { useContext } from "react";

export default function LobbyControls() {

    const {creating, setCreating} = useContext(LobbyContext);

    const handleNewGame = () => {
        setCreating(true);
    }

    return (
        <div className='w-full flex justify-between items-center px-4 py-2 bg-white rounded'>
            <h1 className='text-agency-red text-[1.75rem] leading-none'>Games</h1>
            <button
                className='w-40 border-2 border-deep-purple bg-deep-purple rounded py-2 font-bold cursor-pointer text-white'
                onClick={handleNewGame}
                disabled={creating}
            >New Game
            </button>
        </div>
    );
}