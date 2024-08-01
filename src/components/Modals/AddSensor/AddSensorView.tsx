import React, { FC, ReactNode, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import { CloseButton } from "@components/_shared/CloseButton";
import { Typography } from "@components/_shared/Typography";
import styles from "./styles.module.scss";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { ErrorSharp } from "@mui/icons-material";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
interface Props {
  open: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleClose: () => void;
  handleSubmit: (event: FormEvent) => void;
  values: FormValues;
  errors: FormErrors;
  isValid: boolean;
}
export const AddSensorView: FC<Props> = ({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  values,
  errors,
  isValid,
}) => {
  const cx = useStyles(styles);

  return (
    <Dialog open={open} onClose={handleClose} className={cx("modal")}>
      <DialogTitle className={cx("head")}>
        <Typography> Введите глубину датчика</Typography>

        <CloseButton onClose={handleClose} />
      </DialogTitle>
      <DialogContent className={cx("content")}>
        <form onSubmit={handleSubmit}>
          <fieldset className={cx("fields")}>
            <InputText
              name="depth"
              label="Глубина датчика"
              value={String(values.depth) || ""}
              onChange={handleChange}
              error={Boolean(errors.depth)}
              helperText={errors.depth}
              inputNativeProps={{
                inputMode: "decimal",
                step: 0.1,
                pattern: "[0..9]*[.][0..9]*",
                type: "number",
              }}
            />
          </fieldset>

          <div className={cx("button")}>
            <Button disabled={!isValid}>Сохранить</Button>
          </div>
        </form>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions> */}
    </Dialog>
  );
};
