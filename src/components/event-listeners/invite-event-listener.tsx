import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { socket, socketEvents } from "@/socket";
import { InviteResponse } from "@/types";
import { receiveInvite } from "reducers/entities/invites.reducer";

export default function InviteEventListener() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handler  = (data: InviteResponse) => {
            dispatch({
                type: receiveInvite.type,
                payload: {
                    invite: data.invite
                }
            });
        };

        socket.on(socketEvents.INVITE_SENT, (data) => handler(data));

        return () => {
            socket.off(socketEvents.INVITE_SENT, handler);
        };
    }, []);

    return(
        <></>
    );
}