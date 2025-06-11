import games from '@/mock/games';
import { useSelector } from 'react-redux';
import { RootState } from 'types';

export default function Lobby() {

    const id = useSelector((state:RootState) => state.session.id);

    const gameList = games.map((game, index) => (
        <div 
            key={index}
            className='bg-white rounded'
        >
            <header className='flex justify-between items-center px-4 border-b-2 border-b-deep-purple py-2'>
                <div className='flex flex-col'>
                    <h2 className='text-[1.5rem]'>{game.title}</h2>
                    <h4 className='text-[0.75rem] text-agency-red'>{id === game.gm_id ? 'General Manager' : 'Agent'}</h4>
                </div>
                <button className='w-40 border-2 border-agency-red-700 text-agency-red-700 rounded py-2 font-bold cursor-pointer'>Open Game</button>
            </header>
            <div className='h-[20rem] overflow-y-auto scrollbar-thin'>
                <p className='px-4 py-2'>{game.description}</p>
            </div>
        </div>
    ));
    return(
        <div className='w-screen h-screen bg-agency-red p-6 space-y-6'>
            <div className='grid grid-cols-3 gap-4'>
                {gameList}
            </div>
        </div>
    )
}