import { Main } from "@components/Main";
import { LocationTree } from "@components/Main/components/LocationTree";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";
import sharedStyles from "../../assets/styles/shared.module.scss";
import { LeftSidebar } from "@components/Main/components/LeftSidebar";

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
      <section className={cx("section")}>
        <h2 className={cxShared("title")}>Устройства</h2>
        <LocationTree />
      </section>

      <section className={cx("section")}>
        <Main />
        {/* <SelectedLocation /> */}
        {/* <Routes>
          <Route path="location" element={<SelectedLocation />} />
          <Route path="device/:id" element={<SelectedDevice />} />
        </Routes> */}
      </section>

      <section className={cx("section")}>
        {/* <InfoSticker /> */}
        <LeftSidebar />
      </section>
    </>
  );
};
