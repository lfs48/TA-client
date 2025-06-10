import { User } from "./User.types";

export interface Credentials {
    username: string;
    password: string;
};

export interface AuthRequest {
    credentials: Credentials;
}

export interface AuthResponse {
    user: User;
    jwt: string;
};