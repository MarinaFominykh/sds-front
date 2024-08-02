import { FormEvent } from "react";
import { LoginView } from "./LoginView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { IQuery } from "@src/types/IQuery";
import { useStyles } from "@hooks/useStyles";
import { useFetchMutation } from "@src/redux/api/api";
import { useAppDispatch } from "@hooks/redux";
import { setUser, setCode, authChecked } from "@src/redux/reducers/UserSlice";
import { useAuth } from "@hooks/useAuth";
import styles from "./styles.module.scss";

export const Login = () => {
  const cx = useStyles(styles);
  const { values, handleChange } = useFormValidation();
  const [fetch] = useFetchMutation();
  const auth = useAuth();

  //const { user, isAuthChecked } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    const query: IQuery = {
      cmd: "get_UserByAuth",
      sess_code: "",
      args: values,
    };
    e.preventDefault();

    fetch(query).then((response): void => {
      if ("data" in response) {
        // Для старого сервера:
        // window.localStorage.setItem("session_code", response.data.code);

        // Для нового сервера:

        // window.localStorage.setItem(
        //   "session_code",
        //   response.data.user_sess_code
        // );
        // window.localStorage.setItem(
        //   "user",
        //   JSON.stringify(response.data.data?.[0])
        // );
        // dispatch(setUser(response.data.data?.[0]));
        // dispatch(authChecked(true));
        // navigate("/");
        auth?.login(response);
        dispatch(setUser(response.data.data?.[0]));
        dispatch(setCode(response.data.user_sess_code));
        dispatch(authChecked(true));
      }
    });
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit}>
      <LoginView onChange={handleChange} />
      <span className={cx("error")}>{auth?.error}</span>
      {/* <button>Отправить</button> */}
    </form>
  );
};
