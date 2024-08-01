import { FormValues } from "@hooks/useFormWithValidation";
import { create } from "@mui/material/styles/createTransitions";
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
      providesTags: (result) => ["dev"],
    }),
    getDevsByLocationId: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETDEVSBYLOCATIONID, args),
      }),
      providesTags: (result) => ["dev"],
    }),
    createDev: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETDEV, args),
      }),
      invalidatesTags: (result) => ["dev"],
    }),
    createDevs: build.mutation<IResponse, FormValues[]>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETDEVS, args),
      }),
      invalidatesTags: (result) => ["dev"],
    }),
    editDev: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHANGEDEV, args),
      }),
      invalidatesTags: (result) => ["dev"],
    }),
    getAllLastSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETALLLASTSESS, args),
      }),
      providesTags: (result) => ["lastSessions"],
    }),
    getLastSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETLASTSESS, args),
      }),
      providesTags: (result) => ["lastSession"],
    }),
    getControlSess: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETCONTROLSESS, args),
      }),
      providesTags: (result) => ["controlSession"],
    }),
    createControlSess: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETCONTROLSESS, args),
      }),
      invalidatesTags: (result) => ["controlSession"],
    }),
    removeControlSess: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.DELETECONTROLSESS, args),
      }),
      invalidatesTags: (result) => ["controlSession"],
    }),
    getVerifRange: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETVERIFRANGE, args),
      }),
      providesTags: (result) => ["verifRange"],
    }),
    createVerifRange: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETVERIFRANGE, args),
      }),
      invalidatesTags: (result) => ["verifRange"],
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
