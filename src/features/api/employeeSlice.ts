import { apiSlice } from "./apiSlice";

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createEmployee: builder.mutation({
            query: (employee) => ({
                url: '/user/register',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Area'],
        }),
        updateEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `/user/update/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['Area'],
        }),
        getAllEmployees: builder.query({
            query: (data) => ({
                url: `/user/all-users?page=${data.page}&limit=${data.limit}`,
                method: 'GET'
            }),
            providesTags: ['Area'],
        })
    })
})

export const { useCreateEmployeeMutation, useUpdateEmployeeMutation, useGetAllEmployeesQuery } = employeeSlice