import { configureStore } from '@reduxjs/toolkit';
import actorsAndProducerSlice from './slices/actorAndProducerSlice';
import moviesSlice from './slices/moviesSlice';

export const store = configureStore({
    reducer: {
        actorsAndProducers: actorsAndProducerSlice,
        movies: moviesSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
