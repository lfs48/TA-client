import { rootApi } from './root.api';
import { Reality } from '@/types/Reality.types';

interface RealitiesResponse {
    realities: Reality[];
}

const realitiesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getRealities: builder.query<RealitiesResponse, void>({
            query: () => ({
                url: 'realities',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetRealitiesQuery,
    useLazyGetRealitiesQuery,
} = realitiesApi;

export default realitiesApi;
