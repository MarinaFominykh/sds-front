import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import { IUser, IUserCreate } from "@src/types/IUser";
import { IOrg } from "@src/types/IOrg";
import { FormValues } from "@hooks/useFormWithValidation";
import { create } from "@mui/material/styles/createTransitions";
import { IResponse } from "@src/types/IResponse";
import { IQuery } from "@src/types/IQuery";

type Arguments = {
  group_svg: string;
  id_devs_groups: string;
};
export const schemeAPI = createApi({
  reducerPath: "scheme",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["Scheme"],
  endpoints: (build) => ({
    getScheme: build.query<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETSCHEME, args),
      }),
      providesTags: (result) => ["Scheme"],
    }),
    createScheme: build.mutation<IResponse, Arguments>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETSCHEME, args),
      }),
      invalidatesTags: (result) => ["Scheme"],
    }),
  }),
});

export const { useGetSchemeQuery, useCreateSchemeMutation } = schemeAPI;
