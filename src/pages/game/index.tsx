import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useGetGameByPassphraseQuery } from '@/api/game.api';
import { RootState } from '@/types';
import { selectGameById } from '@/reducers/entities/games.reducer';
import { useEffect, useState } from 'react';
import GameSidebar from './game-sidebar';
import AgentSheet from '@/components/UI/agent';
import { selectAgentById } from '@/reducers/entities/agent.reducer';
import GameContext from '@/pages/game/game-context';
import { useGetARCsQuery } from '@/api/arcs.api';

export default function Game() {

    const [id, setId] = useState<string | undefined>(undefined);
    const [agentId, setAgentId] = useState<string | undefined>(undefined);

    const { passphrase } = useParams();
    const { data, isSuccess, isLoading } = useGetGameByPassphraseQuery(passphrase ?? skipToken);
    const { data: arcData } = useGetARCsQuery();

    const game = useSelector((state: RootState) => selectGameById(state, id));
    const agent = useSelector((state: RootState) => selectAgentById(state, agentId));

    useEffect(() => {
        if(isSuccess && data.game && data.game.id) {
            setId(data.game.id);
        }
    }, [data, isSuccess])

    return(
        <div className='relative bg-agency-red'>
            <div className='px-12 py-6 mr-[20rem]'>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {agent && (
                            <AgentSheet agent={agent} />
                        )}
                    </div>
                )}
            </div>
            {(isSuccess && game) &&
                <GameContext.Provider value={{ agentId, setAgentId }}>
                    <GameSidebar game={game}/>
                </GameContext.Provider>
            }
        </div>
    )
}