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

    const loading = acceptProps.isLoading || rejectProps.isLoading;

    return (
        <div className="flex justify-between items-center space-x-2 px-2 md:px-4 py-1 md:py-2 bg-white rounded">
            <span className="text-[0.75rem] md:text-[1rem]">You've been invited to join <b>{game?.title}</b> by <b>{inviter?.username}</b></span>
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-1">
                <Button
                    buttonClasses="w-[5rem] text-[0.75rem] md:text-[1rem]"
                    color={ButtonColors.GREEN}
                    style={ButtonStyles.OUTLINE}
                    onClick={()=>handleAcceptReject(true)}
                    loading={loading}
                >Accept</Button>
                <Button
                    buttonClasses="w-[5rem] text-[0.75rem] md:text-[1rem]"
                    color={ButtonColors.RED}
                    style={ButtonStyles.OUTLINE}
                    onClick={()=>handleAcceptReject(false)}
                    loading={loading}
                >Decline</Button>
            </div>
        </div>
    );
}