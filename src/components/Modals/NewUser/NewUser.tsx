import { FC, useEffect, useState, FormEvent } from "react";

import { useFormValidation } from "@hooks/useFormWithValidation";
import { useCreateUserMutation } from "@src/redux/services/userApi";
import { useGetAllJobsQuery } from "@src/redux/services/jobsApi";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { useAppDispatch } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { NewUserView } from "./NewUserView";
import { INVALID_FORM } from "@src/utils/messages";
import { passwordRegex } from "@src/utils/regexp";
import {
  MATCHING_LOGIN_AND_PASS_ERROR,
  PASSWORDS_NOT_MATCH,
  INVALID_PASSWORD_ERROR,
} from "@src/utils/messages";

import { IJob } from "@src/types/IJob";
import { eVariantModal } from "@src/types/EvariantModal";

interface Props {
  handleClose: () => void;
}
export const NewUser: FC<Props> = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const [jobOptions, setJobOptions] = useState([]);
  const [_, openModal, __] = useModal();
  const {
    values,
    setValues,
    setErrors,
    errors,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleCloseSelect,
    handleBlur,
    isValid,
    resetForm,
  } = useFormValidation();
  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();
  const { data: orgs } = useGetAllOrgsQuery({});

  const { data: jobs } = useGetAllJobsQuery({});
  const dispatch = useAppDispatch();

  const generateArgs = () => {
    const args = {
      ...values,
      user_r: true,
      user_w: Boolean(values.user_w),
      father: values.father ?? "",
      info: values.info ?? "",
    };
    return args;
  };
  const handleOpenModalAddJob = () => {
    dispatch(
      setVariant({ title: "Добавить должность", variant: eVariantModal.newJob })
    );
    openModal();
  };
  const validationFormValues = (event: FormEvent) => {
    event.preventDefault();
    let isValidForm = false;
    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (errors[key]) {
          isValidForm = false;
          setMessage(INVALID_FORM);
          break;
        } else {
          isValidForm = true;
          setMessage("");
        }
      }
    }

    if (isValidForm) {
      if (!passwordRegex.test(String(values.password))) {
        setMessage(INVALID_PASSWORD_ERROR);
      } else if (values.password !== values.repeat) {
        setMessage(PASSWORDS_NOT_MATCH);
      } else if (values.password === values.login) {
        setMessage(MATCHING_LOGIN_AND_PASS_ERROR);
      }
      // TODO: добавить проверку на совпадение с существующим пользователем, когда будет готов запрос getAllUsers:
      // else if() {
      //   setMessage(DOUBL_LOGIN_ERROR)
      // }
      else {
        setMessage("");
        createNewUser();
      }
    }
  };

  const createNewUser = () => {
    const args = generateArgs();
    createUser(args);
  };

  useEffect(() => {
    const currentJobs = jobs?.data.filter(
      (job: IJob) => job.org_id === values.id_org
    );
    setJobOptions(currentJobs);
  }, [values.id_org]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={validationFormValues} noValidate>
      <NewUserView
        handleChange={handleChange}
        handleCheck={handleCheckboxChange}
        handleSelectChange={handleSelectChange}
        //handleChangeMackInput={handleChangeMackInput}

        handleCloseSelect={handleCloseSelect}
        handleBlur={handleBlur}
        handleOpenModal={handleOpenModalAddJob}
        handleChecked={handleCheckboxChange}
        orgs={orgs?.data}
        jobs={jobOptions}
        values={values}
        errors={errors}
        setValues={setValues}
        setErrors={setErrors}
        isValid={isValid}
        message={message}
        isSuccessSave={isSuccess}
        isErrorSave={isError}
        isLoading={isLoading}
      />
    </form>
  );
};
