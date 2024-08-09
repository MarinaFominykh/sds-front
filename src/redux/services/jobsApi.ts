import { FormValues } from "@hooks/useFormWithValidation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { IResponse } from "@src/types/IResponse";
import { createBodyQuery } from "@src/utils/functions";

export const jobAPI = createApi({
  reducerPath: "job",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  }),
  tagTypes: ["Job"],
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.GETJOB, args),
      }),
      providesTags: () => ["Job"],
    }),
    createJob: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETJOB, args),
      }),
      invalidatesTags: () => ["Job"],
    }),
    editJob: build.mutation<IResponse, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.CHAHGEJOB, args),
      }),
      invalidatesTags: () => ["Job"],
    }),
  }),
});

export const { useGetAllJobsQuery, useCreateJobMutation, useEditJobMutation } =
  jobAPI;
