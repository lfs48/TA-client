export interface Invite {
    id: string;
    inviteeId: string;
    inviterId: string;
    gameId: string;
};

export interface PostInviteRequest {
    invite: {
        inviteeUsername: string;
        gameId: string;
    }

}

export interface InviteResponse {
  invite: Invite;
}