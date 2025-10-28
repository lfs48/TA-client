import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { useGetGameByPassphraseQuery } from '@/api/game.api';
import { EntityTypeName } from '@/types';
import { selectGameById } from '@/reducers/entities/games.reducer';
import { useCallback, useEffect, useState } from 'react';
import GameSidebar from './game-sidebar';
import GameContext from '@/pages/game/game-context';
import { useGetARCsQuery } from '@/api/arcs.api';
import { WorkspaceTabs } from '@/types';
import GameWorkspace from '@/pages/game/game-workspace';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { gameSkeleton } from '@/util/game.util';
import { useGetBonusesQuery } from '@/api/connection-bonus.api';

export default function Game() {

    const [id, setId] = useState<string | undefined>(undefined);
    const [openTabs, setOpenTabs] = useState<WorkspaceTabs>({});
    const [selectedTab, setSelectedTab] = useState<string | null>(null);

    const openTab = useCallback((id: string, type: EntityTypeName) => {
        setOpenTabs((prev) => ({ ...prev, [id]: type }));
    }, []);

    const closeTab = useCallback((id: string) => {
        setOpenTabs((prev) => {
            const newTabs = { ...prev };
            delete newTabs[id];
            return newTabs;
        });
    }, []);

    const { passphrase } = useParams();
    const { data, isSuccess, isLoading } = useGetGameByPassphraseQuery(passphrase ?? skipToken);
    const { data: arcData } = useGetARCsQuery();
    const { bonuses } = useGetBonusesQuery();

    const game = useAppSelector(state => selectGameById(state, id)) || gameSkeleton;

    useEffect(() => {
        if(isSuccess && data.game && data.game.id) {
            setId(data.game.id);
        }
    }, [data, isSuccess])

    return(
        <div className='relative bg-agency-red'>
            {(isSuccess && game) &&
                <GameContext.Provider 
                    value={{ 
                        game,
                        openTabs, 
                        openTab, 
                        closeTab, 
                        selectedTab, 
                        setSelectedTab 
                }}>
                    <GameWorkspace />
                    <GameSidebar />
                </GameContext.Provider>
            }
        </div>
    )
}