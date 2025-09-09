import { 
    APIAnomaly, 
    Competency, 
    Reality 
} from '@/types';
import { rootApi } from './root.api';

interface ARCsResponse {
    anomalies: APIAnomaly[];
    realities: Reality[];
    competencies: Competency[];
}

const arcsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getARCs: builder.query<ARCsResponse, void>({
            query: () => ({
                url: 'arcs',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetARCsQuery,
    useLazyGetARCsQuery,
} = arcsApi

export default arcsApi