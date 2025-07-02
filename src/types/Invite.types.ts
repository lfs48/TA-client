import { InviteStatus } from "@/enum";
import { Game } from "types/Game.types";
import { User } from "types/User.types";

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
  invite: APIInvite;
};

export interface UserInvitesResponse {
    invites: APIInvite[];
};

export interface APIInvite extends Invite {
    invitee: User;
    inviter: User;
    game: Game;
}