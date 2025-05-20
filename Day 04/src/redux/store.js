import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/countSlice'
import adminSlice from './slices/adminSlice'

const store = configureStore({
    reducer: {
        count: counterSlice,
        admin: adminSlice
    },
})

export default store