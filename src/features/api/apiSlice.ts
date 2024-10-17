// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' })

export const apiSlice = createApi({
	baseQuery,
	reducerPath: 'api',
	tagTypes: ['Area', 'Employee', 'Customer', 'Guarantor', 'Loan', 'Setting', 'Payment', 'UserTask'],
	endpoints: (builder) => ({}),
})
