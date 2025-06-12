import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

import { useGetUserGamesQuery } from '@/api/game.api';
import { RootState } from '@/types';
import GameSkeleton from './game-skeleton';
import GameCard from './game-card';
import LobbyControls from './lobby-controls';
import { selectGames } from '@/reducers/entities/games.reducer';

export default function Lobby() {

    const userId = useSelector((state:RootState) => state.session.id);
    const games = useSelector((state: RootState) => selectGames(state));

    const { isLoading } = useGetUserGamesQuery(userId ?? skipToken);

    const gameList = games.map((game, i) => (
        <GameCard key={i} game={game}/>
    ));

    return(
        <div className='w-screen h-screen bg-agency-red p-6 space-y-6'>
            <LobbyControls />
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