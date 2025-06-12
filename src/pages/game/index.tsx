import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useGetGameQuery } from '@/api/game.api';
import { RootState } from '@/types';
import { selectGameById } from '@/reducers/entities/games.reducer';

export default function Game() {

    const { id } = useParams();
    const game = useSelector((state: RootState) => selectGameById(state, id));
    const { isLoading } = useGetGameQuery(id ?? skipToken);

    return(
        <div className='w-screen h-screen bg-agency-red p-6 space-y-6'>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>{game?.title}</div>
                    <div>{game?.description}</div>
                </div>
            )}
        </div>
    )
}