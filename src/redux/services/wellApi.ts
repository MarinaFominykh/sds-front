import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { IResponse } from "@src/types/IResponse";
import { createBodyQuery } from "@src/utils/functions";
import { FormValues } from "@hooks/useFormWithValidation";

export const wellApi = createApi({
  reducerPath: "well",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["well"],
  endpoints: (build) => ({
    getAllWells: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETALLWELLS, args),
      }),
      providesTags: ["well"],
    }),
    createWell: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETWELL, args),
      }),
      invalidatesTags: () => ["well"],
    }),
    editWell: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHANGEWELL, args),
      }),
      invalidatesTags: () => ["well"],
    }),
  }),
});

export const {
  useGetAllWellsQuery,
  useCreateWellMutation,
  useEditWellMutation,
} = wellApi;
