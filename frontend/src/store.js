import { configureStore } from '@reduxjs/toolkit';

//we can give any name reducers
import authReducer from '../src/slices/userAuthSlice';

import { apiSlice } from '../src/services/apiSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

