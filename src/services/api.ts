import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"

const baseUrl = "https://localhost:3000/"


const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl, 
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({}),
})
