// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUploadSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.cloudinary.com/v1_1/dldtrjalo' }),
  reducerPath: 'apiUpload',
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/image/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = apiUploadSlice;
