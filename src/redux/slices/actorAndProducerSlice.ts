import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface init {
    data: {
        actors: [];
        producer: [];
    };
    error: string | undefined;
    status: string;
}

const initialState: init = {
    data: {
        actors: [],
        producer: []
    },
    error: undefined,
    status: 'idle' //'loading' | 'failed' | 'success'
};

export const fetchActors = createAsyncThunk('actors/getAll', async () => {
    try {
        const response = await axios.get(`/actor/getAll`);
        return [...response.data];
    } catch (error: any) {
        return error.message;
    }
});

export const fetchProducers = createAsyncThunk('producer/getAll', async () => {
    try {
        const response = await axios.get(`/producer/getAll`);
        return [...response.data];
    } catch (error: any) {
        return error.message;
    }
});

export const addActorAndProducer = createAsyncThunk('actorOrProducer/add', async (info: any, thunkApi) => {
    try {
        const { type, data } = info;
        const response = await axios.post(`/${type}/add`, { ...data });
        return response;
    } catch (error: any) {
        alert(error.response.data.msg || error.message);
        return error.message || error.response.data.msg;
    }
});

const actorsAndProducerSlice = createSlice({
    name: 'actorsAndProducerSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchActors.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchActors.fulfilled, (state, action) => {
                state.status = 'success';
                state.data.actors = action.payload;
            })
            .addCase(fetchActors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProducers.fulfilled, (state, action) => {
                state.status = 'success';
                state.data.producer = action.payload;
            })
            .addCase(addActorAndProducer.fulfilled, (state, action) => {
                if (action.payload !== 'Request failed with status code 400') {
                    alert(action.payload.data.msg);
                }
            });
    }
});

export default actorsAndProducerSlice.reducer;
