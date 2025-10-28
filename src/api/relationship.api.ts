import { rootApi } from "./root.api";
import { Relationship } from "@/types";

interface PatchRelationshipRequest {
    id: string;
    body: {
        relationship: Partial<Relationship>
    };
}

interface RelationshipResponse {
    relationship: Relationship;
}

export const relationshipApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        patchRelationship: builder.mutation<RelationshipResponse, PatchRelationshipRequest>({
            query: ({ id, body }) => ({
                url: `relationship/${id}`,
                method: 'PATCH',
                body: body
            }),
        }),
    }),
    overrideExisting: false
});

export const { 
    usePatchRelationshipMutation,
} = relationshipApi;

export default relationshipApi;