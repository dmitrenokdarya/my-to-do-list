import { baseApi } from "@/app/baseApi"
import { DefaultResponse, defaultResponseSchema, meResponse, meResponseSchema, loginResponse, loginResponseSchema } from "@/common/types";
import type { LoginInputs } from "@/features/auth/lib/schemas"


export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<meResponse, void>({
      query: () => 'auth/me',
      extraOptions: { dataSchema: meResponseSchema},
    }),
    login: build.mutation<loginResponse, LoginInputs>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      extraOptions: { dataSchema: loginResponseSchema},
    }),
    logout: build.mutation<DefaultResponse, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
      extraOptions: { dataSchema: defaultResponseSchema},
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi