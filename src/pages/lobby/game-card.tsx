import { useNavigate } from "react-router";

import Button from "@/components/UI/button";
import { Game } from "@/types";
import { ButtonColors, ButtonStyles } from "@/enum";
import { useAppSelector } from "@/hooks/useAppSelector.hook";

interface GameCardProps {
    game: Game;
}
export default function GameCard({
    game
}:GameCardProps) {

    const navigate = useNavigate();

    const id = useAppSelector(state => state.session.id);
    const isGM = id === game.gmId;

    const handleOpenGame = () => {
        navigate(`/game/${game.passphrase}`);
    };

    return (
        <div 
            className='w-full bg-white rounded'
        >
            <header className='flex justify-between items-center px-4 border-b-2 border-b-deep-purple py-2'>
                <div className='flex flex-col'>
                    <h2 className='text-[1.25rem] overflow-ellipsis'>{game.title}</h2>
                    <h4 className='text-[0.75rem] text-agency-red'>{isGM ? 'General Manager' : 'Agent'}</h4>
                </div>
                <Button
                    color={ButtonColors.RED}
                    style={ButtonStyles.OUTLINE}
                    buttonClasses='w-[5rem] text-[0.75rem] md:text-[1rem] py-1'
                    onClick={handleOpenGame}
                >Open</Button>
            </header>
            <div className='h-[20rem] overflow-y-auto scrollbar-thin'>
                <p className='px-4 py-2'>{game.description}</p>
            </div>
        </div>
    );
}