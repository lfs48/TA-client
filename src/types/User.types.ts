import { 
    Agent,
    Game, 
} from "./index";

export interface User {
    id: string;
    username: string;
    gameIds: string[];
    agentIds: string[];
}

export interface APIUser extends User {
    games: Game[];
    agents: Agent[];
}

export interface UserResponse {
    user: User;
}