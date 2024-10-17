import { apiSlice } from "./apiSlice";

export const guarantorSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGuarantor: builder.mutation({
            query: (employee) => ({
                url: '/guarantor/create',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Guarantor'],
        }),
        updateGuarantor: builder.mutation<any, any>({
            query: (data) => ({
                url: `/guarantor/update/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['Guarantor'],
        }),
        getAllGuarantors: builder.query({
            query: (data) => ({
                url: `/guarantor/all?page=${data.page}&limit=${data.limit}`,
                method: 'GET'
            }),
            providesTags: ['Guarantor'],
        })
    })
})

export const { useCreateGuarantorMutation, useUpdateGuarantorMutation, useGetAllGuarantorsQuery } = guarantorSlice