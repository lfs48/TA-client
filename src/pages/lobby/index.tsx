import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

import { useGetUserGamesQuery } from '@/api/game.api';
import { RootState } from '@/types';
import GameSkeleton from './game-skeleton';
import GameCard from './game-card';
import LobbyControls from './lobby-controls';
import { selectGames } from '@/reducers/entities/games.reducer';
import LobbyContext from './lobby-context';
import { useEffect, useState } from 'react';
import NewGameForm from './new-game-form';
import InviteCard from './invite-card';
import { selectPendingUserInvites } from '@/reducers/entities/invites.reducer';
import { useGetUserInvitesQuery } from '@/api/invite.api';
import InviteEventListener from 'components/event-listeners/invite-event-listener';

export default function Lobby() {

    const [creating, setCreating] = useState(false);

    const userId = useSelector((state:RootState) => state.session.id);
    const games = useSelector((state: RootState) => selectGames(state));
    const invites = useSelector((state: RootState) => selectPendingUserInvites(state, userId));

    const getGamesProps = useGetUserGamesQuery(userId ?? skipToken);
    const getInvitesProps = useGetUserInvitesQuery(userId ?? skipToken);

    useEffect(() => {
        getGamesProps.refetch();
        getInvitesProps.refetch();
    }, [userId]);

    const gameList = games.map((game) => (
        <GameCard key={game.id} game={game}/>
    ));

    const inviteList = Object.values(invites).map((invite) => (
        <InviteCard key={invite.id} invite={invite}/>
    ));

    return(
        <div className='px-12 py-6 bg-agency-red space-y-6'>
            <InviteEventListener />
            <LobbyContext value={{creating, setCreating}}>
               <LobbyControls />
               {creating && <NewGameForm />}
               {getInvitesProps.isSuccess && inviteList}
            </LobbyContext>
            <div className='grid grid-cols-3 gap-4'>
                {getGamesProps.isLoading ? (
                    [...Array(6).keys()].map((_, i) => <GameSkeleton key={i}/>)
                ): (
                    gameList
                )}
            </div>
        </div>
    )
}