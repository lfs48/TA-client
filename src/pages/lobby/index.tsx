import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { useGetUserGamesQuery } from '@/api/game.api';
import { RootState } from '@/types';
import GameSkeleton from './game-skeleton';
import GameCard from './game-card';
import LobbyControls from './lobby-controls';
import { LobbyFilterOptions } from '@/enum';
import LobbyContext from './lobby-context';
import { selectGames } from '@/reducers/entities/games.reducer';

export default function Lobby() {

    const [filter, setFilter] = useState(LobbyFilterOptions.ALL);

    const userId = useSelector((state:RootState) => state.session.id);
    const games = useSelector((state: RootState) => selectGames(state));

    const { isLoading } = useGetUserGamesQuery(userId ?? skipToken);

    const filteredGames = (filter === LobbyFilterOptions.ALL) ? games : games
    .filter((game) => {
        switch (filter) {
            case(LobbyFilterOptions.PLAYING):
                return game.players.some(player => player.id === userId)
            case (LobbyFilterOptions.GMING):
                return game.gm.id === userId;
        }
    });

    const gameList = filteredGames.map((game, i) => (
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