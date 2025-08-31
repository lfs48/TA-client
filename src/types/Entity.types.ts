import entitiesReducer from "@/reducers/entities/entities.reducer";

export type EntityTypeName = keyof ReturnType<typeof entitiesReducer>;