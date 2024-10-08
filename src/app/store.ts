  import { apiSlice } from '@/services/api'
  import { configureStore } from '@reduxjs/toolkit'


  export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true
  })


  export type RootState = ReturnType<typeof store.getState>

  export type AppDispatch = typeof store.dispatch