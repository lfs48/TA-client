import { rootApi } from './root.api';
import { GameResponse, UserGamesResponse } from 'types/Game.types';

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
    }),
    overrideExisting: false
});

export const { 
    useGetUserGamesQuery,
    useGetGameQuery,
} = gameApi;

export default gameApi;