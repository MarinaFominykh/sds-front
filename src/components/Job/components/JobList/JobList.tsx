import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { JobListView } from "./JobListView";
import { useGetAllJobsQuery } from "@src/redux/services/jobsApi";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useAppDispatch } from "@hooks/redux";
import { setSelectedJob, resetSelectedJob } from "@src/redux/reducers/jobSlice";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { IJob } from "@src/types/IJob";
import { IOrg } from "@src/types/IOrg";

export const JobList = () => {
  const dispatch = useAppDispatch();
  const { data: jobs, isError, isLoading } = useGetAllJobsQuery({});
  const { data: orgs } = useGetAllOrgsQuery({});
  const { values, handleSelectChange } = useFormValidation();
  const [currentJobs, setCurrentJobs] = useState(orgs?.data);

  const handleSelectOrg = (id: string) => {
    const job = jobs?.data?.find((job: IJob) => job.id === id);
    const org = orgs?.data?.find((org: IOrg) => org.id === job.org_id);
    if (job && org) {
      dispatch(setSelectedJob({ ...job, org }));
    } else dispatch(resetSelectedJob());
  };

  useEffect(() => {
    if (jobs?.data) setCurrentJobs(jobs?.data);
  }, [jobs]);

  useEffect(() => {
    if (values.id_org) {
      const filteredJobs = jobs?.data?.filter(
        (job: IJob) => job.org_id === values.id_org
      );
      setCurrentJobs(filteredJobs);
    } else setCurrentJobs(jobs?.data);
  }, [values.id_org]);
  return (
    <>
      {isError ? (
        <Alert severity="error">Произошла ошибка при загрузке данных</Alert>
      ) : (
        <JobListView
          isLoading={isLoading}
          jobs={currentJobs}
          orgs={orgs?.data}
          values={values}
          handleClick={handleSelectOrg}
          handleSelectChange={handleSelectChange}
        />
      )}
    </>
  );
};
