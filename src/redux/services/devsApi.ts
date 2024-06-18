import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";

export const devAPI = createApi({
  reducerPath: "dev",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["dev"],
  endpoints: (build) => ({
    getAllDevs: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETALLDEVS, args),
      }),
      providesTags: (result) => ["dev"],
    }),
    getLasSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETLASTSESS, args),
      }),
      providesTags: (result) => ["dev"],
    }),
  }),
});

export const { useGetAllDevsQuery, useGetLasSessQuery } = devAPI;
