import { Game, RootState, User } from "@/types"
import Button from "@/components/UI/button";
import { useMemo, useState } from "react";
import { ButtonColors, ButtonStyles } from "@/enum";
import { useRemovePlayerMutation } from "@/api/game.api";
import confirmKick from "./confirm-kick";
import { RiUserFill } from "@remixicon/react";
import { usePostInviteMutation } from "@/api/invite.api";
import { useSelector } from "react-redux";
import { selectUsersById } from "@/reducers/entities/users.reducer";

interface PlayersTabProps {
    game: Game;
}

export default function PlayersTab({
    game,
}: PlayersTabProps) {

    const { id, playerIds } = game;

    const players = useSelector((state:RootState) => selectUsersById(state, playerIds))

    const [inviteInput, setInviteInput] = useState('');

    const [triggerRemovePlayer, {}] = useRemovePlayerMutation();
    const [triggerInvitePlayer, { isLoading }] = usePostInviteMutation();

    const handleRemoveConfirmation = async (player:User) => {
        const confirm = await confirmKick({
            player
        })
        if (confirm) {
            handleRemovePlayer(player.id);
        }
    }

    const handleRemovePlayer = (playerId:string) => {
        const data = {
            gameId: id,
            playerId,
        };
        triggerRemovePlayer(data);
    }

    const handleInvitePlayer = () => {
        const data = {
            inviteeUsername: inviteInput,
            gameId: id,
        };
        triggerInvitePlayer({
            invite: data,
        });
    };

    const disableInvite = isLoading || inviteInput.length < 4;

    const playerList = useMemo(()=>(
        players.map((player) => (
            <div key={player.id} className="flex justify-between items-center pb-2 border-b border-b-agency-red-500 last:border-b-0">
                <div className="text-[1.25rem] font-bold">{player.username}</div>
                <Button 
                    style={ButtonStyles.FILL} 
                    color={ButtonColors.RED}
                    className="px-1 py-0.5"
                    onClick={()=>handleRemoveConfirmation(player)}
                >Remove</Button>
            </div>
        ))
    ), [game, players]);

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
                    className="py-1"
                    onClick={handleInvitePlayer}
                    disabled={disableInvite}
                >Invite Player</Button>
            </div>
        </div>
    )
}