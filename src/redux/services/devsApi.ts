import { FormValues } from "@hooks/useFormWithValidation";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { IResponse } from "@src/types/IResponse";
import { createBodyQuery } from "@src/utils/functions";

export const devAPI = createApi({
  reducerPath: "dev",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: [
    "dev",
    "verifRange",
    "lastSessions",
    "lastSession",
    "controlSession",
  ],
  endpoints: (build) => ({
    getAllDevs: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETALLDEVS, args),
      }),
      providesTags: () => ["dev"],
    }),
    getDevById: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETDEVBYID, args),
      }),
      providesTags: () => ["dev"],
    }),
    getDevsByLocationId: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETDEVSBYLOCATIONID, args),
      }),
      providesTags: () => ["dev"],
    }),
    createDev: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETDEV, args),
      }),
      invalidatesTags: () => ["dev"],
    }),
    createDevs: build.mutation<IResponse, FormValues[]>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETDEVS, args),
      }),
      invalidatesTags: () => ["dev"],
    }),
    editDev: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHANGEDEV, args),
      }),
      invalidatesTags: () => ["dev"],
    }),
    getAllLastSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETALLLASTSESS, args),
      }),
      providesTags: () => ["lastSessions"],
    }),
    getLastSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETLASTSESS, args),
      }),
      providesTags: () => ["lastSession"],
    }),
    getControlSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETCONTROLSESS, args),
      }),
      providesTags: () => ["controlSession"],
    }),
    createControlSess: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETCONTROLSESS, args),
      }),
      invalidatesTags: () => ["controlSession"],
    }),
    removeControlSess: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.DELETECONTROLSESS, args),
      }),
      invalidatesTags: () => ["controlSession"],
    }),
    getVerifRange: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETVERIFRANGE, args),
      }),
      providesTags: () => ["verifRange"],
    }),
    createVerifRange: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETVERIFRANGE, args),
      }),
      invalidatesTags: () => ["verifRange"],
    }),
    getSelectedDevSessionByPeriod: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETSELECTEDDEVSESSIONS, args),
      }),
    }),
  }),
});

export const {
  useGetAllDevsQuery,
  useGetDevByIdQuery,
  useGetDevsByLocationIdQuery,
  useCreateDevMutation,
  useCreateDevsMutation,
  useEditDevMutation,
  useGetAllLastSessQuery,
  useGetLastSessQuery,
  useGetControlSessQuery,
  useCreateControlSessMutation,
  useRemoveControlSessMutation,
  useGetVerifRangeQuery,
  useCreateVerifRangeMutation,
  useGetSelectedDevSessionByPeriodQuery,
} = devAPI;
