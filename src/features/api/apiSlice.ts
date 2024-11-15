import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from '../reducer/authSlice'

// const baseQuery = fetchBaseQuery({
// 	baseUrl: import.meta.env.VITE_API_URL,
// 	prepareHeaders: (headers) => {
// 		const token = localStorage.getItem('Bearer') || ''

// 		if (token) {
// 			headers.set('Authorization', `Bearer ${token}`)
// 			headers.set('Content-Type', 'application/json')
// 		}
// 		return headers
// 	},
// })

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('Bearer') || ''

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
				headers.set('Content-Type', 'application/json')
			}
			return headers
		},
	})
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		
		// localStorage.removeItem('userInfo')
		// // localStorage.removeItem('Bearer')

		api.dispatch(logOut())
	}
	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	reducerPath: 'api',

	tagTypes: [
		'Area',
		'Employee',
		'Customer',
		'Guarantor',
		'Loan',
		'Setting',
		'Payment',
		'UserTask',
		'Installment',
	],
	endpoints: (builder) => ({}),
})
