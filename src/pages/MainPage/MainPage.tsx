import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { authChecked } from "@src/redux/reducers/UserSlice";
import { Main } from "@components/Main";
import { LocationTree } from "@components/Main/components/LocationTree";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import sharedStyles from "../../assets/styles/shared.module.scss";

export const MainPage = () => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.clear();
  //   dispatch(authChecked(false));
  //   navigate("/login");
  // };

  return (
    <>
      {/* <h2>MainPage</h2>
      <Link to="/login">Вернуться на форму авторизации</Link>
      <button onClick={handleLogout}>Выйти</button> */}
      <section>
        <h2 className={cxShared("title")}>Устройства</h2>
        <LocationTree />
      </section>

      <section>
        <h2 className={cxShared("title")}>Подробная информация</h2>
        <Main />
      </section>
      <div className={cx("box")}>Колонка 3</div>
    </>
  );
};
