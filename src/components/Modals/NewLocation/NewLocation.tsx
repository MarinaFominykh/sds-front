import { useState, FormEvent, useEffect, FC } from "react";
import { NewLocationView } from "./NewLocationView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useCreateLocationMutation } from "@src/redux/services/locacationApi";

interface Props {
  handleClose: () => void;
}
export const NewLocation: FC<Props> = ({ handleClose }) => {
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
  const [createLocation, { isError, isLoading, isSuccess }] =
    useCreateLocationMutation();
  const [message] = useState("");
  const isValidForm = () => {
    return (
      isValid &&
      Boolean(values.id_org) &&
      !Boolean(errors.latitude) &&
      !Boolean(errors.longitude)
    );
  };
  const generateArgs = () => {
    const args = {
      ...values,
      parent_id: "0",
      deleted: false,
      g_info: values.g_info ?? "",
    };
    return args;
  };
  const createNewLocation = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    createLocation(args);
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
    <form onSubmit={createNewLocation} noValidate>
      <NewLocationView
        orgs={orgs?.data}
        values={values}
        errors={errors}
        message={message}
        handleChange={handleChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectChange={handleSelectChange}
        isValid={isValidForm()}
        isSuccessSave={isSuccess}
        isErrorSave={isError}
        isLoading={isLoading}
      />
    </form>
  );
};
