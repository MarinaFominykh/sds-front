import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";

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
  }),
});

export const { useGetAllWellsQuery } = wellApi;
