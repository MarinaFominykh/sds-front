import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import { IUser, IUserCreate } from "@src/types/IUser";
import { IOrg } from "@src/types/IOrg";
import { FormValues } from "@hooks/useFormWithValidation";

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
      providesTags: (result) => ["Org"],
    }),
    createOrg: build.mutation<IOrg, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETORG, args),
      }),
      invalidatesTags: (result) => ["Org"],
    }),
  }),
});

export const { useGetAllOrgsQuery, useCreateOrgMutation } = orgAPI;
