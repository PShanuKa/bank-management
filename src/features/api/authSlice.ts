import { apiSlice } from "./apiSlice";

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials
            }),
        })
    })
})

export const { useLoginMutation } = authSlice