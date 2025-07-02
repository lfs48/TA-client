import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { Invite, RootState } from "@/types";
import { selectGameById } from "@/reducers/entities/games.reducer";
import { selectUserById } from "@/reducers/entities/users.reducer";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import { useAcceptInviteMutation, useRejectInviteMutation } from "@/api/invite.api";
import { useLazyGetUserGamesQuery } from "@/api/game.api";

interface InviteCardProps {
    invite: Invite;
}

export default function InviteCard({
    invite
}: InviteCardProps) {

    const { id, gameId, inviterId, inviteeId } = invite;
    const game = useSelector((state:RootState) => selectGameById(state, gameId));
    const inviter = useSelector((state:RootState) => selectUserById(state, inviterId));

    const [triggerAcceptInvite, acceptProps] = useAcceptInviteMutation();
    const [triggerRejectInvite, rejectProps] = useRejectInviteMutation();
    const [getUserGames] = useLazyGetUserGamesQuery();

    const handleAcceptReject = async (accept: boolean) => {
        const trigger = accept ? triggerAcceptInvite : triggerRejectInvite;
        const message = accept ? `You've joined ${game?.title}!` : `You've declined ${inviter?.username}'s invitation.`;
        try {
            await trigger(id).unwrap();
            toast.success(message);
            await getUserGames(inviteeId);
        } catch {
            toast.error(`Something went wrong, please try again.`);
        }
    };

    const disabled = acceptProps.isLoading || rejectProps.isLoading;

    return (
        <div className="flex justify-between items-center px-4 py-2 bg-white rounded">
            <span>You've been invited to join <b>{game?.title}</b> by <b>{inviter?.username}</b></span>
            <div className="space-x-2">
                <Button
                    className="w-24 py-1"
                    color={ButtonColors.GREEN}
                    style={ButtonStyles.OUTLINE}
                    onClick={()=>handleAcceptReject(true)}
                    disabled={disabled}
                >Accept</Button>
                <Button
                    className="w-24 py-1"
                    color={ButtonColors.RED}
                    style={ButtonStyles.OUTLINE}
                    onClick={()=>handleAcceptReject(false)}
                    disabled={disabled}
                >Decline</Button>
            </div>
        </div>
    );
}