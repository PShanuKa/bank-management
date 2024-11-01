import { apiSlice } from './apiSlice'

export const areaSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		areaCreate: builder.mutation({
			query: (data) => ({
				url: '/area/create',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Area'],
		}),
		areaUpdate: builder.mutation({
			query: (data) => ({
				url: `/area/update/${data.id}`,
				method: 'PUT',
				body: data.formData,
			}),
			invalidatesTags: ['Area'],
		}),
		getAllAreas: builder.query({
			query: (data) => ({
				url: `/area/all?page=${data.page}&limit=${data.limit}`,
				method: 'GET',
			}),
			providesTags: ['Area'],
		}),
		getAAreas: builder.query({
			query: (data) => ({
				url: `/area/${data.id}`,
				method: 'GET',
			}),
			providesTags: ['Area'],
		}),
		
	}),
})

export const {
	useAreaCreateMutation,
	useAreaUpdateMutation,
	useGetAllAreasQuery,
	useGetAAreasQuery
} = areaSlice
