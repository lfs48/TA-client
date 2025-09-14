import { Game } from "@/types";

export const gameSkeleton: Game = {
    id: '',
    title: '',
    description: '',
    active: false,
    passphrase: '',
    gmId: '',
    playerIds: [],
    inviteIds: [],
    inviteeIds: [],
    agentIds: [],
    createdAt: new Date().toISOString(),
};