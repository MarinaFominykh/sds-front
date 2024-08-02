import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { createBodyQuery } from "@src/utils/functions";
import { FormValues } from "@hooks/useFormWithValidation";
import { IResponse } from "@src/types/IResponse";

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
      providesTags: () => ["Scheme"],
    }),
    createScheme: build.mutation<IResponse, Arguments>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETSCHEME, args),
      }),
      invalidatesTags: () => ["Scheme"],
    }),
  }),
});

export const { useGetSchemeQuery, useCreateSchemeMutation } = schemeAPI;
