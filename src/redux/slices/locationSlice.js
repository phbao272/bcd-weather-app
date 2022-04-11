import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import apis from '../../apis'

export const setLocationActive = createAsyncThunk(
    'location/setLocationActive',
    async (params) => {
        // console.log(params)
        const res = await apis.getLocationNameByCoordinates(
            params.lon,
            params.lat,
        )
        return res.data[0].local_names.vi
    },
)

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
            state.locations.push(action.payload)
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
    },
})

// Action creators are generated for each case reducer function
export const { addLocation } = locationSlice.actions

export default locationSlice.reducer
