import { rootApi } from './root.api';
import { GameResponse, PatchGameRequest, PostGameRequest, RemovePlayerRequest, UserGamesResponse } from 'types/Game.types';

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
        patchGame: builder.mutation<GameResponse, PatchGameRequest>({
            query: (data) => ({
                url: `game/${data.game.id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        removePlayer: builder.mutation<GameResponse, RemovePlayerRequest>({
            query: (data) => ({
                url: `game/${data.gameId}/remove-player`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetUserGamesQuery,
    useLazyGetUserGamesQuery,
    useGetGameByIdQuery,
    useGetGameByPassphraseQuery,
    usePostGameMutation,
    usePatchGameMutation,
    useRemovePlayerMutation,
} = gameApi;

export default gameApi;