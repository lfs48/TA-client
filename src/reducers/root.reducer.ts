import { combineReducers } from "@reduxjs/toolkit";
import { rootApi } from "@/api/root.api";

const rootReducer = combineReducers({
    [rootApi.reducerPath]: rootApi.reducer,
});

export default rootReducer;