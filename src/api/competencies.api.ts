import { rootApi } from './root.api';
import { Competency } from '@/types/Competency.types';

interface CompetenciesResponse {
    competencies: Competency[];
}

const competenciesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getCompetencies: builder.query<CompetenciesResponse, void>({
            query: () => ({
                url: 'competencies',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetCompetenciesQuery,
    useLazyGetCompetenciesQuery,
} = competenciesApi;

export default competenciesApi;
