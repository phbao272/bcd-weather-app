import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import apis from '../../apis'

export const getWeatherData = createAsyncThunk(
    'weather/getWeatherData',
    async (params, thunkAPI) => {
        // console.log(params)
        const res = await apis.getWeatherData(params.lon, params.lat)
        return res.data
    },
)

const initState = {
    weatherData: {},
    loading: true,
    error: '',
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initState,
    reducers: {
        addWeatherData: (state, action) => {
            state.weatherData = action.payload
        },
    },
    extraReducers: {
        [getWeatherData.pending]: (state) => {
            state.loading = true
        },
        [getWeatherData.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [getWeatherData.fulfilled]: (state, action) => {
            state.weatherData = action.payload
            state.loading = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { addWeatherData } = weatherSlice.actions

export default weatherSlice.reducer
