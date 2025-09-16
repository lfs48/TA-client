import { rootApi } from "@/api/root.api";
import { AbilityInstanceResponse, PatchAbilityInstanceRequest } from "@/types";

export const abilityInstancesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        patchAbilityInstance: builder.mutation<AbilityInstanceResponse, PatchAbilityInstanceRequest>({
            query: ({ id, data }) => ({
                url: `ability-instance/${id}`,
                method: 'PATCH',
                body: data,
            })
        }),
    }),
    overrideExisting: false
});

export const { 
    usePatchAbilityInstanceMutation,
} = abilityInstancesApi;