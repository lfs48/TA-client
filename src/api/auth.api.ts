import { AuthRequest, AuthResponse } from '@/types';
import { rootApi } from './root.api';

export const authApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation<AuthResponse, AuthRequest>({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: data
            })
        })
    }),
    overrideExisting: false
});

export const { 
    useLoginMutation,
    useRegisterMutation
} = authApi;