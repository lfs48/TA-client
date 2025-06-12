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
        getGame: builder.query<GameResponse, string>({
            query: (gameId) => ({
                url: `game/${gameId}`,
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
    useGetGameQuery,
    usePostGameMutation,
} = gameApi;

export default gameApi;