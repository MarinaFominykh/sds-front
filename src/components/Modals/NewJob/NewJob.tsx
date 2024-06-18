import React, { FormEvent, FC, useState, useEffect } from "react";
import { useFormValidation } from "@hooks/useFormWithValidation";
import {
  useGetAllOrgsQuery,
  useCreateOrgMutation,
} from "@src/redux/services/orgApi";
import { useCreateJobMutation } from "@src/redux/services/jobsApi";
import { NewJobView } from "./NewJobView";
import { SAVE_SUCCESS, SAVE_ERROR } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { set } from "react-hook-form";
import { IJob } from "@src/types/IJob";

interface Props {
  handleClose: () => void;
}

export const NewJob: FC<Props> = ({ handleClose }) => {
  const cx = useStyles(styles);
  const {
    values,
    setValues,
    setErrors,
    errors,
    handleChange,
    handleSelectChange,
    handleChangeTelInput,
    handleCheckboxChange,
    handleCloseSelect,
    handleBlur,
    isValid,
    resetForm,
  } = useFormValidation();
  const { data: orgs } = useGetAllOrgsQuery({});
  const [createJob, { isLoading, error, isError, isSuccess }] =
    useCreateJobMutation();

  const generateArgs = () => {
    const args = {
      ...values,
      info: values.info ?? "",
    };
    return args;
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    createJob(args);
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <form className={cx("add-job")} onSubmit={handleSubmit}>
      <NewJobView
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleCloseSelect={handleCloseSelect}
        values={values}
        errors={errors}
        orgs={orgs?.data}
        isValid={isValid}
        successSave={isSuccess}
        errorSave={isError}
        isLoadind={isLoading}
      />
    </form>
  );
};
