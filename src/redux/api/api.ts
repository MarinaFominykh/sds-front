import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuery } from "@src/types/IQuery";
import { IResponse } from "@src/types/IResponse";

export const mainApi = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  endpoints: (builder) => ({
    fetch: builder.mutation<IResponse, IQuery>({
      query: (body) => ({
        url: "/api",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchMutation } = mainApi;
