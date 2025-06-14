import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Game, RootState } from "types";

interface GameCardProps {
    game: Game;
}
export default function GameCard({
    game
}:GameCardProps) {

    const navigate = useNavigate();

    const id = useSelector((state:RootState) => state.session.id);
    const isGM = id === game.gm.id;

    const handleOpenGame = () => {
        navigate(`/game/${game.passphrase}`);
    };

    return (
        <div 
            className='w-full bg-white rounded'
        >
            <header className='h-[5rem] flex justify-between items-center px-4 border-b-2 border-b-deep-purple py-2'>
                <div className='flex flex-col'>
                    <h2 className='text-[1.5rem]'>{game.title}</h2>
                    <h4 className='text-[0.75rem] text-agency-red'>{isGM ? 'General Manager' : 'Agent'}</h4>
                </div>
                <button 
                    className='w-40 border-2 border-agency-red-700 text-agency-red-700 rounded py-2 font-bold cursor-pointer'
                    onClick={handleOpenGame}
                >Open Game</button>
            </header>
            <div className='h-[20rem] overflow-y-auto scrollbar-thin'>
                <p className='px-4 py-2'>{game.description}</p>
            </div>
        </div>
    );
}