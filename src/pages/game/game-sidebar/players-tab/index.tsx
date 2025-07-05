import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RiUserFill } from "@remixicon/react";
import toast from 'react-hot-toast';

import confirmKick from "./confirm-kick";
import { useRemovePlayerMutation } from "@/api/game.api";
import { usePostInviteMutation } from "@/api/invite.api";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import { selectUsersById } from "@/reducers/entities/users.reducer";
import { Game, RootState, User } from "@/types";

interface PlayersTabProps {
    game: Game;
}

export default function PlayersTab({
    game,
}: PlayersTabProps) {

    const { id, playerIds } = game;

    const players = useSelector((state:RootState) => selectUsersById(state, playerIds));
    
    const [inviteInput, setInviteInput] = useState('');

    const [triggerRemovePlayer, removeProps] = useRemovePlayerMutation();
    const [triggerInvitePlayer, inviteProps] = usePostInviteMutation();

    const handleRemoveConfirmation = async (player:User) => {
        const confirm = await confirmKick({
            player
        })
        if (confirm) {
            handleRemovePlayer(player);
        }
    }

    const handleRemovePlayer = (player:User) => {
        const data = {
            gameId: id,
            playerId: player.id,
        };
        toast.promise(
            triggerRemovePlayer(data).unwrap(),
            {
                loading: `Removing ${player.username}...`,
                success: `${player.username} has been removed!`,
                error: 'Oops, something went wrong. Please try again.',
            }
        );
    }

    const handleInvitePlayer = async () => {
        const data = {
            inviteeUsername: inviteInput,
            gameId: id,
        };
        toast.promise(
            triggerInvitePlayer({invite: data}).unwrap(),
            {
                loading: 'Sending invitation...',
                success: 'Invitation sent!',
                error: 'Oops, something went wrong. Please try again.',
            }
        );
    };

    const disableInvite = inviteProps.isLoading || inviteInput.length < 4;

    const playerList = useMemo(()=>(
        players.map((player) => (
            <div key={player.id} className="flex justify-between items-center pb-2 border-b border-b-agency-red-500 last:border-b-0">
                <div className="text-[1.25rem] font-bold">{player.username}</div>
                <Button 
                    style={ButtonStyles.FILL} 
                    color={ButtonColors.RED}
                    buttonClasses="px-1 py-0.5"
                    onClick={()=>handleRemoveConfirmation(player)}
                    loading={removeProps.isLoading}
                >Remove</Button>
            </div>
        ))
    ), [playerIds]);

    return(
        <div className="flex flex-col p-4 space-y-6">
            <h2>Manage Players</h2>
            <div className="flex flex-col space-y-2">
                {players.length > 0 ? (
                    playerList
                ) : (
                    <div>This game doesn't have any players yet</div>
                )}
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 px-2 py-1 bg-gray-200 rounded">
                    <RiUserFill className="opacity-50"/>
                    <input
                        value={inviteInput}
                        onChange={(e)=>setInviteInput(e.target.value)}
                        placeholder='Username'
                    />
                </div>
                <Button
                    color={ButtonColors.PURPLE}
                    style={ButtonStyles.FILL}
                    className="w-full"
                    buttonClasses="w-full py-1"
                    onClick={handleInvitePlayer}
                    disabled={disableInvite}
                    loading={inviteProps.isLoading}
                >Invite Player</Button>
            </div>
        </div>
    )
}