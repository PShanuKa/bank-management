import { logOut, setUser } from "../reducer/authSlice";
import { apiSlice } from "./apiSlice";

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled
                    dispatch(setUser(result.data))
                    console
                } catch (error) {
                    console.error('Login failed:',error)
                    dispatch(logOut())
                }
            }
        })
    })
})

export const { useLoginMutation } = authSlice