import { combineReducers } from "@reduxjs/toolkit";

import abilitiesReducer from './abilities.reducer';
import anomaliesReducer from './anomalies.reducer';
import agentsReducer from './agent.reducer';
import competenciesReducer from './competencies.reducer';
import gamesReducer from './games.reducer';
import invitesReducer from './invites.reducer';
import realitiesReducer from './realities.reducer';
import usersReducer from './users.reducer';
import { createAppSelector } from "@/util";
import { EntityTypeName, RootState } from "@/types";

const entitiesReducer = combineReducers({
    abilities: abilitiesReducer,
    anomalies: anomaliesReducer,
    agents: agentsReducer,
    competencies: competenciesReducer,
    games: gamesReducer,
    invites: invitesReducer,
    realities: realitiesReducer,
    users: usersReducer,
});

interface SelectEntitiesProps {
    [id: string]: EntityTypeName;
}

interface SelectEntitiesResult {
    [type: string]: {
        [id: string]: {
            id: string;
            [key: string]: any;
        };
    };
}

export const selectEntities = createAppSelector(
    [
    (state: RootState) => state.entities,
    (_: RootState, selectedEntities?: SelectEntitiesProps) => selectedEntities,
    ],
    (entities, selectedEntities) => {
        if (!selectedEntities) return undefined;
        const res = {} as SelectEntitiesResult;
        Object.entries(selectedEntities).forEach(([id, type]) => {
            if (id && type && type in entities) {
                if (!res[type]) res[type] = {};
                res[type][id] = entities[type][id];
            }
        });
        return res;
    }
);

export default entitiesReducer;