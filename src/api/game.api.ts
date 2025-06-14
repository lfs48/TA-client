import { rootApi } from './root.api';
import { GameResponse, PostGameRequest, UserGamesResponse } from 'types/Game.types';

const gameApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserGames: builder.query<UserGamesResponse, string>({
            query: (id) => ({
                url: `user/${id}/games`,
                method: 'GET',
            }),
        }),
        getGameById: builder.query<GameResponse, string>({
            query: (id) => ({
                url: `game/${id}`,
                method: 'GET',
            }),
        }),
        getGameByPassphrase: builder.query<GameResponse, string>({
            query: (passphrase) => ({
                url: `game?passphrase=${passphrase}`,
                method: 'GET',
            }),
        }),
        postGame: builder.mutation<GameResponse, PostGameRequest>({
            query: (data) => ({
                url: `game`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetUserGamesQuery,
    useGetGameByIdQuery,
    useGetGameByPassphraseQuery,
    usePostGameMutation,
} = gameApi;

export default gameApi;