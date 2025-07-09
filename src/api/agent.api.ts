import { AgentResponse, AgentsResponse, } from '@/types';
import { rootApi } from './root.api';

export const agentApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgent: builder.query<AgentResponse, string>({
            query: (id) => ({
                url: `agents/${id}`,
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
                url: `user/${gameId}/agents`,
                method: 'GET',
            })
        }),
        postAgent: builder.mutation<AgentResponse, string>({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: data
            })
        }),
    }),
    overrideExisting: false
});

export const {
    useGetAgentQuery,
    useGetUserAgentsQuery,
    useGetGameAgentsQuery,
    usePostAgentMutation,
} = agentApi;