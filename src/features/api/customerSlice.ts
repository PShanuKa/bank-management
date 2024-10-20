import { apiSlice } from "./apiSlice";

export const customerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCustomer: builder.mutation({
            query: (employee) => ({
                url: '/customer/create',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Customer'],
        }),
        updateCustomer: builder.mutation<any, any>({
            query: (data) => ({
                url: `/customer/update/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['Customer'],
        }),
        getAllCustomers: builder.query({
            query: (data) => ({
                url: `/customer/all-customers?page=${data.page}&limit=${data.limit}`,
                method: 'GET'
            }),
            providesTags: ['Customer'],
        }),
        searchCustomer: builder.query({
            query: (data) => ({
                url: `/customer/search?customerCode=${data}`,
                method: 'GET'
            }),
            
        })
    })
})

export const { useCreateCustomerMutation, useUpdateCustomerMutation, useGetAllCustomersQuery, useSearchCustomerQuery } = customerSlice