import { useState, useEffect, FC, FormEvent } from "react";
import { EditUserView } from "./EditUserView";
import { useAppSelector } from "@hooks/redux";
import { FormValues, useFormValidation } from "@hooks/useFormWithValidation";
import { useEditUserMutation } from "@src/redux/services/userApi";

import {
  INVALID_FORM,
  INVALID_PASSWORD_ERROR,
  PASSWORDS_NOT_MATCH,
  MATCHING_LOGIN_AND_PASS_ERROR,
} from "@src/utils/messages";
import { passwordRegex } from "@src/utils/regexp";

interface Props {
  handleClose: () => void;
}

export const EditUser: FC<Props> = ({ handleClose }) => {
  const { selectedUser } = useAppSelector((state) => state.userSlice);

  // const { data: orgs } = useGetAllOrgsQuery({});
  // const { data: jobs } = useGetAllJobsQuery({});
  // const [jobOptions, setJobOptions] = useState([]);
  const [editUser, { isError, isSuccess, isLoading }] = useEditUserMutation();
  const [message, setMessage] = useState("");
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleCheckboxChange,
    resetForm,
  } = useFormValidation();
  const isWrite = selectedUser?.roles_ids.roles[1] === 2;
  const generateArgs = (values: FormValues) => {
    //TODO: поле deleted в каких случаях true?
    const args = {
      id: Number(selectedUser?.id),
      isAdmin: Boolean(isWrite ? false : true),
      family: values.family,
      name: values.name,
      father: values.father,
      password: values.password,
      email: values.email,
      info: values.info,
      deleted: Boolean(values.deleted),
    };
    return args;
  };

  const validationFormValues = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { family, name, email, login } = formJson;
    if (!family || !name || !email || !login) {
      setMessage(INVALID_FORM);
    } else if (values.password) {
      if (!passwordRegex.test(String(values.password))) {
        setMessage(INVALID_PASSWORD_ERROR);
      } else if (values.password !== values.repeat) {
        setMessage(PASSWORDS_NOT_MATCH);
      } else if (values.password === values.login) {
        setMessage(MATCHING_LOGIN_AND_PASS_ERROR);
      }
    } else {
      setMessage("");
      changeUser(formJson);
    }
  };

  const changeUser = (formValues: FormValues) => {
    const args = generateArgs(formValues);
    editUser(args);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);

  // //Options для поля выбора должности при первом рендере
  // useEffect(() => {
  //   if (jobs && "data" in jobs) setJobOptions(jobs.data);
  // }, [jobs]);

  // //Подставляем в поля значения выбранного пользователя при открытии модального окна, и фильтрууем options
  // // в зависимости от выбранного пользователя
  // useEffect(() => {
  //   if (selectedUser) {
  //     setValues({
  //       ...values,

  //       id_jobs: selectedUser.job_title_id,
  //     });
  //   }
  //   if (jobs && "data" in jobs && !values.id_org) {
  //     const currentJobs = jobs?.data.filter(
  //       (job: IJob) => job.org_id === selectedUser?.org_id
  //     );
  //     setJobOptions(currentJobs);
  //   }
  // }, [selectedUser, jobs]);

  // // Фильтруем options для поля выбора должности в зависимости от выбранной организации
  // useEffect(() => {
  //   if (selectedUser && values.id_org) {
  //     dispatch(setSelectedUser({ ...selectedUser, job_title_id: "" }));
  //     const currentJobs = jobs?.data.filter(
  //       (job: IJob) => job.org_id === values.id_org
  //     );
  //     setJobOptions(currentJobs);
  //   }
  // }, [values.id_org]);

  return (
    <form onSubmit={validationFormValues} noValidate>
      <EditUserView
        user={selectedUser}
        //orgs={orgs?.data}
        //values={values}
        //jobs={jobOptions}
        //jobs={jobs?.data}
        message={message}
        handleChange={handleChange}
        handleChecked={handleCheckboxChange}
        //handleSelectChange={handleSelectChange}
        errors={errors}
        isValidForm={isValid}
        isLoading={isLoading}
        isErrorSave={isError}
        isSuccessSave={isSuccess}
      />
    </form>
  );
};
