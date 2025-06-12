import { User } from "./User.types";

export interface Game {
    id: string;
    title: string;
    description: string;
    gm: User;
    players: User[];
}

export interface UserGamesResponse {
    games: Game[];
}

export interface GameResponse {
    game: Game;
}