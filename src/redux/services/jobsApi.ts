import { FormValues } from "@hooks/useFormWithValidation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ECOMMAND } from "@src/types/ECommand";
import { IJob } from "@src/types/IJob";
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
      providesTags: (result) => ["Job"],
    }),
    createJob: build.mutation<IJob, FormValues>({
      query: (args) => ({
        url: "/api",
        method: "POST",
        body: createBodyQuery(ECOMMAND.SETJOB, args),
      }),
      invalidatesTags: (result) => ["Job"],
    }),
  }),
});

export const { useGetAllJobsQuery, useCreateJobMutation } = jobAPI;
