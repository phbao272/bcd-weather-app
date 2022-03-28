import { createSlice } from '@reduxjs/toolkit'

const initState = {
    weatherData: {},
    locationActive: '',
    locations: [],
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: initState,
    reducers: {
        addWeatherData: (state, action) => {
            state.weatherData = action.payload
        },
        setLocationActive: (state, action) => {
            state.locationActive = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { addWeatherData, setLocationActive } = weatherSlice.actions

export default weatherSlice.reducer
