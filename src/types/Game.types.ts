import { User } from "types/User.types";

export interface Game {
    id: string;
    title: string;
    description: string;
    active: boolean;
    passphrase: string;
    gmId: string;
    playerIds: string[];
    createdAt: string;
};

export type APIGame = Game & {
    gm: User;
    players: User[];
}

export interface UserGamesResponse {
    games: APIGame[];
};

export interface GameResponse {
    game: APIGame;
};

export interface PostGameRequest {
    game: {
        title: string;
        description: string;
    }
};

export interface PatchGameRequest {
    game: {
        id: string;
        title?: string;
        description?:string;
        active?: boolean;
    }
};

export interface RemovePlayerRequest {
    gameId: string;
    playerId: string;
}