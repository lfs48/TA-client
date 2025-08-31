import { rootApi } from './root.api';
import { Anomaly } from '@/types/Anomaly.type';

interface AnomaliesResponse {
    anomalies: Anomaly[];
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