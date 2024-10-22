import { apiSlice } from "./apiSlice";

export const userTaskSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUserTask: builder.mutation({
            query: (data) => ({
                url: '/user-task/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['UserTask'],
        }),
        updateUserTask: builder.mutation({
            query: (data) => ({
                url: `/user-task/update/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['UserTask'],
        }), 
        deleteUserTask: builder.mutation({
            query: (id) => ({
                url: `/user-task/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserTask'],
        }),
        submitUserTask: builder.mutation({
            query: (data) => ({
                url: `/user-task/submit/${data.id}`,
                method: 'PUT',
                body: data.formData
            }),
            invalidatesTags: ['UserTask'],
        }),
        getAllUserTask: builder.query({
            query: (data) => ({
                url: `/user-task/all?search=${data.search}&page=${data.page}&limit=${data.limit}`,
                method: 'GET',
            }),
            providesTags: ['UserTask'],
        })
    })
})

export const { useCreateUserTaskMutation, useUpdateUserTaskMutation, useDeleteUserTaskMutation, useSubmitUserTaskMutation, useGetAllUserTaskQuery , } = userTaskSlice