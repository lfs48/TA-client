import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
        token: localStorage.jwt || "",
    }
});

export enum socketEvents {
    INVITE_SENT = "game-invite-sent",
    INVITE_ACCEPTED = "game-invite-accepted",
    INVITE_REJECTED = "game-invite-rejected",
}