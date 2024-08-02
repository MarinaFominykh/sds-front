import { Login } from "@components/Login";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

export const LoginPage = () => {
  const cx = useStyles(styles);

  return (
    <section className={cx("section")}>
      <Login />
    </section>
  );
};
