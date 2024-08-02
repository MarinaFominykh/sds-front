import { FC, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@components/_shared/Typography";
import { InputWithIcon } from "@components/_shared/Inputs/InputWithIcon";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}
export const LoginView: FC<Props> = ({ onChange }) => {
  const cx = useStyles(styles);
  //const { handleChange } = useFormValidation();
  return (
    <div className={cx("container")}>
      <Typography className={cx("title")} variant="h4">
        Авторизация
      </Typography>
      <Typography className={cx("subtitle")} variant="body1">
        Пожалуйста, введите ваш логин и пароль
      </Typography>
      <fieldset className={cx("fields")}>
        <InputText
          name="login"
          placeholder="Логин"
          onChange={onChange}
          variant="standard"
          InputProps={{
            style: {
              fontSize: 16,
              padding: "4px 12px",
              boxSizind: "border-box",
            },
          }}
        />
        <InputWithIcon
          name="password"
          placeholder="Пароль"
          onChange={onChange}
        />
      </fieldset>
      <fieldset className={cx("btn-container")}>
        <Link className={cx("link")} to="/forgot-password">
          ← Забыли пароль?
        </Link>
        <Button>Войти</Button>
      </fieldset>
    </div>
  );
};
