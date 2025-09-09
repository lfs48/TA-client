import { rootApi } from './root.api';
import { APIAnomaly } from '@/types/Anomaly.type';

interface AnomaliesResponse {
    anomalies: APIAnomaly[];
}

const anomaliesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnomalies: builder.query<AnomaliesResponse, void>({
            query: () => ({
                url: 'anomalies',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetAnomaliesQuery,
    useLazyGetAnomaliesQuery,
} = anomaliesApi;

export default anomaliesApi;