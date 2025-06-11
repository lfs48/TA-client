import { rootApi } from './root.api';
import { UserGamesResponse } from 'types/Game.types';

const gameApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserGames: builder.query<UserGamesResponse, string>({
            query: (id) => ({
                url: `user/${id}/games`,
                method: 'GET',
            })
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetUserGamesQuery
} = gameApi;

export default gameApi;