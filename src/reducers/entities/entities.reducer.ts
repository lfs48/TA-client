import { combineReducers } from "@reduxjs/toolkit";

import gamesReducer from './games.reducer';
import invitesReducer from './invites.reducer';
import usersReducer from './users.reducer';

const entitiesReducer = combineReducers({
    games: gamesReducer,
    invites: invitesReducer,
    users: usersReducer,
});

export default entitiesReducer;