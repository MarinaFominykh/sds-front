import { Header } from "@components/Header";
import { Outlet } from "react-router-dom";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

export const Layout = () => {
  const cx = useStyles(styles);
  return (
    <>
      <Header />
      <main className={cx("main")}>
        <Outlet />
      </main>
    </>
  );
};
