import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import { IOrg } from "@src/types/IOrg";
import { FormValues } from "@hooks/useFormWithValidation";
import { IResponse } from "@src/types/IResponse";

export const orgAPI = createApi({
  reducerPath: "org",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["Org"],
  endpoints: (build) => ({
    getAllOrgs: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETORG, args),
      }),
      providesTags: () => ["Org"],
    }),
    createOrg: build.mutation<IOrg, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETORG, args),
      }),
      invalidatesTags: () => ["Org"],
    }),
    editOrg: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHANGEORG, args),
      }),
      invalidatesTags: () => ["Org"],
    }),
  }),
});

export const { useGetAllOrgsQuery, useCreateOrgMutation, useEditOrgMutation } =
  orgAPI;
