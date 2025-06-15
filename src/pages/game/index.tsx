import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useGetGameByPassphraseQuery } from '@/api/game.api';
import { RootState } from '@/types';
import { selectGameById } from '@/reducers/entities/games.reducer';
import { useEffect, useState } from 'react';
import GameSidebar from './game-sidebar';

export default function Game() {

    const [id, setId] = useState<string | undefined>(undefined);

    const { passphrase } = useParams();
    const { data, isSuccess, isLoading } = useGetGameByPassphraseQuery(passphrase ?? skipToken);

    const game = useSelector((state: RootState) => selectGameById(state, id));

    useEffect(() => {
        if(isSuccess && data.game && data.game.id) {
            setId(data.game.id);
        }
    }, [data, isSuccess])

    return(
        <div className='relative bg-agency-red'>
            <div className='px-12 py-6'>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>{game?.title}</div>
                    <div>{game?.description}</div>
                </div>
            )}
            </div>
            {(isSuccess && game) &&
                <GameSidebar />
            }
        </div>
    )
}