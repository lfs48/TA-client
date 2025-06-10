import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { rootApi } from '@/api/root.api';
import rootReducer from '@/reducers/root.reducer';

// Create the application Redux store
export function configureAppStore(preloadedState={}) {
    // Create the store with middleware
    const middlewares:Middleware[] = [];
    middlewares.push(rootApi.middleware);

    // Include development-only middleware
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    //Create the store object with configuration options
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: preloadedState
    });

    //Return the configured store
    return store;
}