import { apiSlice } from "./apiSlice";

export const settingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateSetting: builder.mutation<any, any>({
            query: (data) => ({
                url: '/setting',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Setting'],
        }),
        getSetting: builder.query({
            query: () => ({
                url: '/setting',
                method: 'GET',
            }),
            providesTags: ['Setting'],
            
        }),
        
    })
})

export const { useUpdateSettingMutation, useGetSettingQuery } = settingSlice