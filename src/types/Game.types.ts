import { User } from "./User.types";

export interface Game {
    id: string;
    title: string;
    description: string;
    active: boolean;
    gm: User;
    players: User[];
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