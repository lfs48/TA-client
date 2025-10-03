import { rootApi } from './root.api';
import { APICompetency } from '@/types/Competency.types';

interface CompetenciesResponse {
    competencies: APICompetency[];
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
