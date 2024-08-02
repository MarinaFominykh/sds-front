import { ChangeEvent, FC } from "react";
import { TextField, Alert } from "@mui/material";

import { Button } from "@components/_shared/Button";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { FormErrors } from "@hooks/useFormWithValidation";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  errors: FormErrors;
  message: string;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    regexp?: RegExp
  ) => void;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}
export const NewVerifRangeView: FC<Props> = (props) => {
  const {
    errors,
    message,
    handleChange,
    isErrorSave,
    isSuccessSave,
    isValid,
    isLoading,
  } = props;
  const cx = useStyles(styles);

  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <TextField
            name="start_povs"
            size="small"
            type="datetime-local"
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            error={Boolean(errors.start_povs)}
            helperText={errors.start_povs}
          />
          <TextField
            name="end_povs"
            size="small"
            type="datetime-local"
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            error={Boolean(errors.end_povs)}
            helperText={errors.end_povs}
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
        <Button isLoading={isLoading} disabled={!isValid}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
