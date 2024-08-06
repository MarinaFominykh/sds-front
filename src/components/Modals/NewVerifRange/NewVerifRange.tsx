import { FormEvent, useState, useEffect, FC } from "react";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAppSelector } from "@hooks/redux";
import { NewVerifRangeView } from "./NewVerifRangeView";
import { useCreateVerifRangeMutation } from "@src/redux/services/devsApi";
import { useGetVerifRangeQuery } from "@src/redux/services/devsApi";

interface Props {
  handleClose: () => void;
}

export const NewVerifRange: FC<Props> = ({ handleClose }) => {
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  const [createVerifRange, { data: response, isError, isLoading, isSuccess }] =
    useCreateVerifRangeMutation();
  const { data: period } = useGetVerifRangeQuery(
    {
      dev_id: selectedDev?.id,
      dev_number: selectedDev?.number,
    },
    { skip: !Boolean(selectedDev) }
  );

  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();
  const [message, setMessage] = useState("");
  const generateArgs = () => {
    const args = {
      ...values,
      dev_id: selectedDev?.id ?? "",
      dev_number: selectedDev?.number ?? "",
      old_dev_povs: period?.data?.[0]?.id ?? "0",
    };
    return args;
  };

  const addNewVerifRange = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();

    createVerifRange(args);
  };
  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccess && !response.error) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);
  return (
    <form onSubmit={addNewVerifRange} noValidate>
      <NewVerifRangeView
        message={message}
        errors={errors}
        handleChange={handleChange}
        isValid={isValid}
        isLoading={isLoading}
        isErrorSave={isError}
        isSuccessSave={isSuccessSave()}
      />
    </form>
  );
};
