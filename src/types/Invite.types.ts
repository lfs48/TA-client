import { InviteStatus } from "@/enum";

export interface Invite {
    id: string;
    inviteeId: string;
    inviterId: string;
    gameId: string;
    status: InviteStatus;
};

export interface PostInviteRequest {
    invite: {
        inviteeUsername: string;
        gameId: string;
    }

};

export interface InviteResponse {
  invite: Invite;
};

export interface UserInvitesResponse {
    invites: Invite[];
};