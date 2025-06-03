import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
    token: null
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin(state, { payload }) {
            state.data = payload.admin;
            state.token = payload.token;
            localStorage.setItem("admin", JSON.stringify(state.data));
            localStorage.setItem("token", state.token)
        },
        lsToAdmin(state) {
            const admin = localStorage.getItem("admin");

            if (admin) {
                state.data = JSON.parse(admin)
                state.token = localStorage.getItem("token")
            }

        }
    },
})

// Action creators are generated for each case reducer function
export const { setAdmin, lsToAdmin } = adminSlice.actions

export default adminSlice.reducer