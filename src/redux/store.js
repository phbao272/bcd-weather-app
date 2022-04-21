import { configureStore } from '@reduxjs/toolkit'

import weatherReducer from './slices/WeatherSlice'
import locationReducer from './slices/locationSlice'

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        location: locationReducer,
    },
})

export default store
