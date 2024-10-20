import { apiSlice } from "./apiSlice";

export const loanSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLoan: builder.mutation({
            query: (employee) => ({
                url: '/loan/create',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Loan'],
        }),
        updateLoan: builder.mutation<any, any>({
            query: (data) => ({
                url: `/loan/update/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['Loan'],
        }),
        actionLoan: builder.mutation<any, any>({
            query: (data) => ({
                url: `/loan/action/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['Loan'],
        }),
        getALoan: builder.query({
            query: (data) => ({
                url: `/loan/${data}`,
                method: 'GET'
            }),
            providesTags: ['Loan'],
        }),
        getAllLoan: builder.query({
            query: (data) => ({
                url: `/loan/all?status=${data.status}&page=${data.page}&limit=${data.limit}`,
                method: 'GET'
            }),
            providesTags: ['Loan'],
        }),
        getReminderLoan: builder.query({
            query: (data) => ({
                url: `/loan//reminder?endDate=${data.endDate}&page=${data.page}&limit=${data.limit}`,
                method: 'GET'
            }),
            providesTags: ['Loan'],
        })
    })
})

export const { useCreateLoanMutation, useUpdateLoanMutation, useGetAllLoanQuery , useActionLoanMutation, useGetALoanQuery, useGetReminderLoanQuery } = loanSlice