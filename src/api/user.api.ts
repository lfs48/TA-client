import { UserResponse } from '@/types';
import { rootApi } from './root.api';

const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, string>({
            query: (id) => ({
                url: `user/${id}`,
                method: 'GET',
            })
        }),
    }),
    overrideExisting: false
});

export const { 
    useGetUserQuery
} = userApi;

export default userApi;