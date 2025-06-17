import { PostInviteRequest, InviteResponse } from '@/types';
import { rootApi } from './root.api';

const inviteApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    postInvite: builder.mutation<InviteResponse, PostInviteRequest>({
      query: (data) => ({
        url: 'Invite',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
    usePostInviteMutation 
} = inviteApi;
export default inviteApi;