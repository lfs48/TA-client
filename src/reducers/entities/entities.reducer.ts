import { combineReducers } from "@reduxjs/toolkit";

import anomaliesReducer from './anomalies.reducer';
import agentsReducer from './agent.reducer';
import gamesReducer from './games.reducer';
import invitesReducer from './invites.reducer';
import realitiesReducer from './realities.reducer';
import usersReducer from './users.reducer';

const entitiesReducer = combineReducers({
    anomalies: anomaliesReducer,
    agents: agentsReducer,
    games: gamesReducer,
    invites: invitesReducer,
    realities: realitiesReducer,
    users: usersReducer,
});

export default entitiesReducer;