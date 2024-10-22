
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import { authSlice } from './features/reducer/authSlice'
import { apiUploadSlice } from './features/api/uploadSlice'


export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[apiUploadSlice.reducerPath]: apiUploadSlice.reducer,
		[authSlice.name]: authSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware).concat(apiUploadSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
