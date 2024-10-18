
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({ 
	baseUrl: 'http://localhost:3000/api',
	prepareHeaders: (headers) => {
	  const token = localStorage.getItem('Bearer') || ''
	  
	  if(token){
		headers.set('Authorization', `Bearer ${token}`)
		headers.set('Content-Type', 'application/json')
	  }
	  return headers;
	}
})

export const apiSlice = createApi({
	baseQuery,
	reducerPath: 'api',
	
	tagTypes: ['Area', 'Employee', 'Customer', 'Guarantor', 'Loan', 'Setting', 'Payment', 'UserTask'],
	endpoints: (builder) => ({}),
})
