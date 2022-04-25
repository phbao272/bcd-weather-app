import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import apis from '../../apis'

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${key}`)
        return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
        // error reading value
    }
}

export const setLocationActive = createAsyncThunk('location/setLocationActive', async (params) => {
    // console.log(params)
    const res = await apis.getLocationNameByCoordinates(params.lon, params.lat)
    return res.data[0].local_names.vi
})

export const setLocations = createAsyncThunk('location/setLocations', async () => {
    const res = getData('locations')
    console.log('setLocations')
    return res
})

// getData('locations')
const initState = {
    locationActive: '',
    locations: [],
    loading: '',
    error: '',
}

export const locationSlice = createSlice({
    name: 'location',
    initialState: initState,
    reducers: {
        addLocation: (state, action) => {
            state.locations = action.payload
        },
    },
    extraReducers: {
        [setLocationActive.pending]: (state) => {
            state.loading = true
        },
        [setLocationActive.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [setLocationActive.fulfilled]: (state, action) => {
            state.locationActive = action.payload
            state.loading = false
        },

        [setLocations.pending]: (state) => {
            state.loading = true
        },
        [setLocations.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [setLocations.fulfilled]: (state, action) => {
            state.locations = action.payload
            state.loading = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { addLocation } = locationSlice.actions

export default locationSlice.reducer
