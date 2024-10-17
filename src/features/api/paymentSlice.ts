import { apiSlice } from "./apiSlice";

export const paymentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (employee) => ({
                url: '/payment/create',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Payment'],
        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/payment/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payment'],
        }),
        getPayment: builder.query({
            query: (id) => ({
                url: `/payment/${id}`,
                method: 'GET',
            }),
            providesTags: ['Payment'],
        }),
       
    })
})

export const { useCreatePaymentMutation, useDeletePaymentMutation, useGetPaymentQuery } = paymentSlice