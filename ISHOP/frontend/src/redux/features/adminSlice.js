import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin(state, current) {
            console.log(current)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAdmin } = adminSlice.actions

export default adminSlice.reducer