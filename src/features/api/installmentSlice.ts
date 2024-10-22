import { apiSlice } from './apiSlice'

export const installmentSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createInstallment: builder.mutation({
			query: (data) => ({
				url: '/installment/create',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Installment'],
		}),
		getInstallment: builder.query({
			query: (id) => ({
				url: `/installment/${id}`,
				method: 'GET',
			}),
			providesTags: ['Installment'],
		}),
		updateInstallment: builder.mutation({
			query: (data) => ({
				url: `/installment/${data.id}`,
				method: 'PUT',
				body: data.formData,
			}),
			invalidatesTags: ['Installment'],
		}),
		deleteInstallment: builder.mutation({
			query: (id) => ({
				url: `/installment/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Installment'],
		}),
		reminderInstallment: builder.query({
			query: () => ({
				url: `/installment/reminder`,
				method: 'GET',
			}),
			providesTags: ['Installment'],
		}),
	}),
})

export const {
	useCreateInstallmentMutation,
	useGetInstallmentQuery,
	useUpdateInstallmentMutation,
	useDeleteInstallmentMutation,
	useReminderInstallmentQuery,
} = installmentSlice
