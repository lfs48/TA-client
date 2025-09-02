import { 
    AgentResponse, 
    AgentsResponse,
    PatchAgentRequest,
    PatchQualityRequest,
    PostAgentRequest, 
} from '@/types';
import { rootApi } from './root.api';

export const agentApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgent: builder.query<AgentResponse, string>({
            query: (id) => ({
                url: `agent/${id}`,
                method: 'GET',
            })
        }),
        getUserAgents: builder.query<AgentsResponse, string>({
            query: (userId) => ({
                url: `user/${userId}/agents`,
                method: 'GET',
            })
        }),
        getGameAgents: builder.query<AgentsResponse, string>({
            query: (gameId) => ({
                url: `game/${gameId}/agents`,
                method: 'GET',
            })
        }),
        postAgent: builder.mutation<AgentResponse, PostAgentRequest>({
            query: (data) => ({
                url: `agent`,
                method: 'POST',
                body: data
            })
        }),
        patchAgent: builder.mutation<AgentResponse, { id: string; data: PatchAgentRequest }>({
            query: ({ id, data }) => ({
                url: `agent/${id}`,
                method: 'PATCH',
                body: data
            })
        }),
        adjustCurrentQuality: builder.mutation<AgentResponse, { id: string; data: PatchQualityRequest }>({
            query: ({ id, data }) => ({
                url: `agent/${id}/qa/current`,
                method: 'PATCH',
                body: data
            })
        }),
        adjustMaxQuality: builder.mutation<AgentResponse, { id: string; data: PatchQualityRequest }>({
            query: ({ id, data }) => ({
                url: `agent/${id}/qa/max`,
                method: 'PATCH',
                body: data
            })
        })
    }),
    overrideExisting: false
});

export const {
    useGetAgentQuery,
    useGetUserAgentsQuery,
    useGetGameAgentsQuery,
    usePostAgentMutation,
    usePatchAgentMutation,
    useAdjustCurrentQualityMutation,
    useAdjustMaxQualityMutation
} = agentApi;