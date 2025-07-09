import { combineReducers } from "@reduxjs/toolkit";

import agentsReducer from './agent.reducer';
import gamesReducer from './games.reducer';
import invitesReducer from './invites.reducer';
import usersReducer from './users.reducer';

const entitiesReducer = combineReducers({
    agents: agentsReducer,
    games: gamesReducer,
    invites: invitesReducer,
    users: usersReducer,
});

export default entitiesReducer;