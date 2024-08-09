import { useState, FormEvent, useEffect, FC } from "react";
import { EditJobView } from "./EditJobView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAppSelector } from "@hooks/redux";
import { useEditJobMutation } from "@src/redux/services/jobsApi";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { FormValues } from "@hooks/useFormWithValidation";
import { INVALID_FORM } from "@src/utils/messages";

interface Props {
  handleClose: () => void;
}

export const EditJob: FC<Props> = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const { resetForm, errors, handleChange, handleSelectChange } =
    useFormValidation();
  const [editJob, { data: response, isError, isLoading, isSuccess }] =
    useEditJobMutation();
  const { data: orgs } = useGetAllOrgsQuery({});
  const { selectedJob } = useAppSelector((state) => state.jobSlice);

  //Сериализуем форму
  const serializeForm = (formNode: HTMLFormElement) => {
    const { elements } = formNode;

    const data = Array.from(elements)
      .filter(
        (item) =>
          (item instanceof HTMLInputElement ||
            item instanceof HTMLTextAreaElement) &&
          item.name
      )
      .map((element) => {
        const inputElement = element as HTMLInputElement;
        return { name: inputElement.name, value: inputElement.value };
      });

    return data;
  };
  //Генерируем аргументы для запроса на сервер
  const generateArgs = (formNode: HTMLFormElement) => {
    let args: FormValues = {
      id: selectedJob?.id ?? "",
    };
    const data = serializeForm(formNode);
    data.forEach((item) => {
      args = { ...args, [item.name]: item.value };
    });

    return args;
  };

  //Валидация формы и обработчик сабмита
  const validationForm = (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const args = generateArgs(target);
    if (!args.name) {
      setMessage(INVALID_FORM);
    } else {
      setMessage("");
      editJob(args);
    }
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
    <form onSubmit={validationForm} noValidate>
      <EditJobView
        job={selectedJob}
        orgs={orgs?.data}
        errors={errors}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        message={message}
        isErrorSave={isError}
        isLoading={isLoading}
        isSuccessSave={isSuccessSave()}
        // isValid={isValid}
      />
    </form>
  );
};
