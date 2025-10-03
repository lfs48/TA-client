import { rootApi } from "@/api/root.api";
import { APIRequisitionInstance } from "types";

interface PatchRequisitionInstanceRequest {
    id: string;
    data: {
        requisitionInstance: {
            currentUses?: number;
            notes?: string;
            rented?: boolean;
            quantity?: number;
        }

    };
}

interface PatchRequisitionInstanceResponse {
    requisitionInstance: APIRequisitionInstance;
}

export const requisitionInstancesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        patchRequisitionInstance: builder.mutation<PatchRequisitionInstanceResponse, PatchRequisitionInstanceRequest>({
            query: ({ id, data }) => ({
                url: `requisition-instance/${id}`,
                method: 'PATCH',
                body: data,
            })
        }),
    }),
    overrideExisting: false
});

export const { 
    usePatchRequisitionInstanceMutation,
} = requisitionInstancesApi;