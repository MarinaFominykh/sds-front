import { FC } from "react";
import { Alert } from "@mui/material";

import { Button } from "@components/_shared/Button";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}
export const DeleteControlSessionView: FC<Props> = (props) => {
  const { message, isSuccessSave, isErrorSave, isLoading } = props;
  const cx = useStyles(styles);
  return (
    <div className={cx("container")}>
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
        <Button isLoading={isLoading}>Удалить</Button>
      </div>
    </div>
  );
};
