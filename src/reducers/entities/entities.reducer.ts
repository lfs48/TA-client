import { combineReducers } from "@reduxjs/toolkit";

import gamesReducer from './games.reducer';
import usersReducer from './users.reducer';

const entitiesReducer = combineReducers({
    games: gamesReducer,
    users: usersReducer,
});

export default entitiesReducer;