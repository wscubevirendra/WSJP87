import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {name:"Mahesh"},
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLogin(state) {
            console.log(state)
        },


    },
})

// Action creators are generated for each case reducer function
export const { adminLogin } = adminSlice.actions

export default adminSlice.reducer