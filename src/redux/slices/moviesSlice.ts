import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface init {
    movies: [];
    error: string | undefined;
    status: string;
}

const initialState: init = {
    movies: [],
    error: undefined,
    status: 'idle' //'loading' | 'failed' | 'success'
};

export const fetchMovies = createAsyncThunk('movie/getAll', async () => {
    try {
        const response = await axios.get(`/movie/getAll`);
        return [...response.data];
    } catch (error: any) {
        return error.message;
    }
});

export const addMovie = createAsyncThunk('movie/add', async (data: FormData, thunkApi) => {
    try {
        const response = await axios({
            method: 'post',
            url: `/movie/add`,
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response;
    } catch (error: any) {
        alert(error.response.data.msg || error.message);
        return error.message || error.response.data.msg;
    }
});

export const deleteMovie = createAsyncThunk('movie/delete', async (id: string, thunkApi) => {
    try {
        const response = await axios.delete(`/movie/delete/${id}`);
        return [...response.data];
    } catch (error: any) {
        return error.message;
    }
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = '';
                state.movies = action.payload || [];
            })
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
                state.movies = [];
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                if (action.payload !== 'Request failed with status code 400') {
                    alert(action.payload.data.msg);
                }
            })
            .addCase(addMovie.pending, (state, action) => {
                state.status = 'loading';
            });
    }
});

export default moviesSlice.reducer;
