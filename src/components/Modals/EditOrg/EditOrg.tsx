import { useState, FormEvent, useEffect, FC } from "react";
import { EditOrgView } from "./EditOrgView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAppSelector } from "@hooks/redux";
import {
  useEditOrgMutation,
  useGetAllOrgsQuery,
} from "@src/redux/services/orgApi";

import { FormValues } from "@hooks/useFormWithValidation";
import { INVALID_FORM } from "@src/utils/messages";
import { DOUBLE_INN_ERROR, DOUBLE_NAME_ORG_ERROR } from "@src/utils/messages";
import { isInnInArray } from "@src/utils/functions";

interface Props {
  handleClose: () => void;
}
export const EditOrg: FC<Props> = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const { resetForm, errors, handleChange } = useFormValidation();
  const { selectedOrg } = useAppSelector((state) => state.orgSlise);
  const [editOrg, { data: response, isError, isLoading, isSuccess }] =
    useEditOrgMutation();
  const { data: orgs } = useGetAllOrgsQuery({});

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
      id: selectedOrg?.id ?? "",
    };
    const data = serializeForm(formNode);
    data.forEach((item) => {
      args = { ...args, [item.name]: item.value };
    });

    return args;
  };

  //Валидация формы и обработчик сабмита
  const validationForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const args = generateArgs(target);
    const isDoubleInn = isInnInArray(orgs.data, String(args.inn), "inn");
    const isDoubleNameOrg = isInnInArray(
      orgs.data,
      String(args.full_name),
      "full_name"
    );
    //Проверка на пустые значения и на совпадения по ИНН и полномму наименованию
    if (
      !args.full_name ||
      !args.name ||
      !args.inn ||
      !args.address ||
      String(args.inn).length !== (10 || 12)
    ) {
      setMessage(INVALID_FORM);
    } else if (isDoubleInn && args.inn !== selectedOrg?.inn) {
      setMessage(DOUBLE_INN_ERROR);
    } else if (isDoubleNameOrg && args.full_name !== selectedOrg?.full_name) {
      setMessage(DOUBLE_NAME_ORG_ERROR);
    } else {
      setMessage("");
      changeOrg(args);
    }
  };

  const changeOrg = (args: FormValues) => {
    editOrg(args);
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
      <EditOrgView
        org={selectedOrg}
        errors={errors}
        handleChange={handleChange}
        message={message}
        isErrorSave={isError}
        isLoading={isLoading}
        isSuccessSave={isSuccessSave()}
      />
    </form>
  );
};
