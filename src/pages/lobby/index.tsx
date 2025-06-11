import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

import { useGetUserGamesQuery } from '@/api/game.api';
import { RootState } from '@/types';
import GameSkeleton from './game-skeleton';
import GameCard from './game-card';

export default function Lobby() {

    const id = useSelector((state:RootState) => state.session.id);
    const games = useSelector((state:RootState) => state.entities.games);

    const { isLoading } = useGetUserGamesQuery(id ?? skipToken);

    const gameList = Object.values(games).map((game, i) => (
        <GameCard key={i} game={game}/>
    ));
    return(
        <div className='w-screen h-screen bg-agency-red p-6 space-y-6'>
            <div className='grid grid-cols-3 gap-4'>
                {isLoading ? (
                    [...Array(6).keys()].map((_, i) => <GameSkeleton key={i}/>)
                ): (
                    gameList
                )}
            </div>
        </div>
    )
}