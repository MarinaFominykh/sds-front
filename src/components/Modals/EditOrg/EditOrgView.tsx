import { FC, ChangeEvent } from "react";
import { Alert } from "@mui/material";
import { FormErrors } from "@hooks/useFormWithValidation";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IOrg } from "@src/types/IOrg";

interface Props {
  org: IOrg | null;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  errors: FormErrors;

  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}
export const EditOrgView: FC<Props> = (props) => {
  const {
    org,
    handleChange,
    errors,
    message,
    isErrorSave,
    isSuccessSave,
    isLoading,
  } = props;
  const cx = useStyles(styles);
  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <InputText
            name="full_name"
            label="Полное наименование"
            //value={(values?.full_name as string) || ""}
            defaultValue={org?.full_name}
            onChange={handleChange}
            error={Boolean(errors.full_name)}
            helperText={errors.full_name}
          />
          <InputText
            name="name"
            label="Наименование"
            //value={(values?.name as string) || ""}
            defaultValue={org?.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <InputText
            name="inn"
            label="ИНН"
            defaultValue={org?.inn}
            onChange={handleChange}
            error={Boolean(errors.inn)}
            helperText={errors.inn}
            placeholder="10- или 12-значный цифровой код"
            inputNativeProps={{
              pattern: "[0-9]{10,12}",
            }}
          />
          <InputText
            name="address"
            label="Адрес"
            defaultValue={org?.address}
            onChange={handleChange}
            error={Boolean(errors.address)}
            helperText={errors.address}
          />
          <InputText
            name="info"
            label="Информация"
            defaultValue={org?.info}
            multiline={true}
            onChange={handleChange}
            rows={4}
            required={false}
          />
        </fieldset>
      </div>
      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}
      {isSuccessSave && (
        <Alert className={cx("alert")} severity="success">
          {SAVE_SUCCESS}
        </Alert>
      )}
      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}

      <div className={cx("button")}>
        <Button isLoading={isLoading}>Сохранить</Button>
      </div>
    </>
  );
};
