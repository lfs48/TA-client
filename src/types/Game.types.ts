import { User } from "./User.types";

export interface Game {
    id: string;
    title: string;
    description: string;
    active: boolean;
    passphrase: string;
    gm: User;
    players: User[];
    createdAt: string;
}

export interface UserGamesResponse {
    games: Game[];
}

export interface GameResponse {
    game: Game;
}

export interface PostGameRequest {
    game: {
        title: string;
        description: string;
    }
}