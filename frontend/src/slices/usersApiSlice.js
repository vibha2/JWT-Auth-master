import { apiSlice } from "../services/apiSlice";
const USERS_URL = '/api/v1/';

export const usersApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        
        register: builder.mutation({
            query: (data) => ({
                url: `register`,
                method: 'POST',
                body: data,
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: `login`,
                method: 'POST',
                body: data,
            })
            
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: 'logout',
                method: 'POST',
            })
        })
    }),


})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = usersApiSlice;