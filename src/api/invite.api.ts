import { PostInviteRequest, InviteResponse, UserInvitesResponse } from '@/types';
import { rootApi } from './root.api';

const inviteApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInvites: builder.query<UserInvitesResponse, string>({
        query: (id) => ({
            url: `user/${id}/invites`,
            method: 'GET',
        }),
    }),
    postInvite: builder.mutation<InviteResponse, PostInviteRequest>({
      query: (data) => ({
        url: 'invite',
        method: 'POST',
        body: data,
      }),
    }),
    acceptInvite: builder.mutation<InviteResponse, string>({
      query: (id) => ({
        url: `invite/${id}/accept`,
        method: 'PATCH',
      }),
    }),
    rejectInvite: builder.mutation<InviteResponse, string>({
      query: (id) => ({
        url: `invite/${id}/reject`,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetUserInvitesQuery,
  usePostInviteMutation,
  useAcceptInviteMutation,
  useRejectInviteMutation,
} = inviteApi;
export default inviteApi;