import { combineReducers } from "@reduxjs/toolkit";

import { rootApi } from "@/api/root.api";

import entitiesReducer from "./entities/entities.reducer";
import sessionReducer from './session.reducer';

const rootReducer = combineReducers({
    [rootApi.reducerPath]: rootApi.reducer,
    entities: entitiesReducer,
    session: sessionReducer,
});

export default rootReducer;