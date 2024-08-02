import { FormEvent, FC, useEffect } from "react";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useCreateJobMutation } from "@src/redux/services/jobsApi";
import { NewJobView } from "./NewJobView";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  handleClose: () => void;
}

export const NewJob: FC<Props> = ({ handleClose }) => {
  const cx = useStyles(styles);
  const {
    values,
    errors,
    handleChange,
    handleSelectChange,
    handleCloseSelect,
    isValid,
    resetForm,
  } = useFormValidation();
  const { data: orgs } = useGetAllOrgsQuery({});
  const [createJob, { isLoading, isError, isSuccess }] = useCreateJobMutation();

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
