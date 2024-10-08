import { apiSlice } from "./api"

const USERS_URL = "/api/user"

export interface Post {
    id: number
    name: string
  }

export const authSlice = apiSlice.injectEndpoints({})

