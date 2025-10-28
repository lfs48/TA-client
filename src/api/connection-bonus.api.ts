import { 
    ConnectionBonus,
} from '@/types';
import { rootApi } from './root.api';

interface BonusesResponse {
    bonuses: ConnectionBonus[];
}

const bonusesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getBonuses: builder.query<BonusesResponse, void>({
            query: () => ({
                url: 'bonuses',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetBonusesQuery,
    useLazyGetBonusesQuery,
} = bonusesApi

export default bonusesApi;