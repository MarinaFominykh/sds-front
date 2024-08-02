import { FC, ChangeEvent, FormEvent } from "react";
import { TextField } from "@mui/material";
import { Button } from "@components/_shared/Button";
import { SessionTable } from "../SessionTable";

import { FormErrors } from "@hooks/useFormWithValidation";
import { ISession } from "@src/types/ISession";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IDev } from "@src/types/IDev";

interface Props {
  errors: FormErrors;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    regexp?: RegExp
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  sessions: ISession[];
  isAdmin: boolean;
  device: IDev | null;
  isLoadingGetSessions: boolean;
  isSuccessGetSession: boolean;
  isErrorGetSession: boolean;
}
export const SessonsTabView: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const { errors, handleChange, handleSubmit, isValid, ...other } = props;
  return (
    <div className={cx("container")}>
      <form onSubmit={handleSubmit}>
        <fieldset className={cx("fields")}>
          <TextField
            name="sess_period_start"
            size="small"
            type="datetime-local"
            required
            label="Начало периода"
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            error={Boolean(errors.sess_period_start)}
            helperText={errors.sess_period_start}
          />
          <TextField
            name="sess_period_end"
            size="small"
            type="datetime-local"
            required
            label="Конец периода"
            sx={{ mr: "16px", fontSize: "14px", mb: "8px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            error={Boolean(errors.sess_period_end)}
            helperText={errors.sess_period_end}
          />
          <Button type="submit" disabled={!isValid}>
            Установить
          </Button>
        </fieldset>
      </form>
      <SessionTable {...other} />
    </div>
  );
};
