import { FormEvent, useState, useEffect, FC } from "react";
import { NewOrgView } from "./NewOrgView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import {
  useCreateOrgMutation,
  useGetAllOrgsQuery,
} from "@src/redux/services/orgApi";
import { DOUBLE_INN_ERROR, DOUBLE_NAME_ORG_ERROR } from "@src/utils/messages";
import { isInnInArray } from "@src/utils/functions";
interface Props {
  handleClose: () => void;
}
export const NewOrg: FC<Props> = ({ handleClose }) => {
  const { handleChange, handleBlur, resetForm, values, errors, isValid } =
    useFormValidation();
  const [createOrg, { isLoading, isError, isSuccess }] = useCreateOrgMutation();
  const { data: orgs } = useGetAllOrgsQuery({});
  const [message, setMessage] = useState("");

  // function isInnInArray<T extends keyof IOrg>(
  //   orgs: IOrg[],
  //   value: string,
  //   field: T
  // ) {
  //   return orgs.some((org) => org[field] === value);
  // }

  const generateArgs = () => {
    const args = {
      ...values,
      info: values.info ?? "",
    };
    return args;
  };

  const validationFormValues = (event: FormEvent) => {
    event.preventDefault();
    const isDoubleInn = isInnInArray(orgs.data, String(values.inn), "inn");
    const isDoubleNameOrg = isInnInArray(
      orgs.data,
      String(values.full_name),
      "full_name"
    );
    if (isDoubleInn) {
      setMessage(DOUBLE_INN_ERROR);
    } else if (isDoubleNameOrg) {
      setMessage(DOUBLE_NAME_ORG_ERROR);
    } else {
      setMessage("");
      createNewOrg();
    }
  };

  const createNewOrg = () => {
    const args = generateArgs();
    createOrg(args);
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
    <form onSubmit={validationFormValues} noValidate>
      <NewOrgView
        handleBlur={handleBlur}
        handleChange={handleChange}
        errors={errors}
        isValidForm={isValid}
        isLoading={isLoading}
        isErrorSave={isError}
        isSuccessSave={isSuccess}
        message={message}
      />
    </form>
  );
};
