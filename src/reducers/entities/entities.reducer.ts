import { combineReducers } from "@reduxjs/toolkit";

import gamesReducer from './games.reducer';

const entitiesReducer = combineReducers({
    games: gamesReducer,
});

export default entitiesReducer;