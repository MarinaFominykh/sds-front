import { UserTree, SelectedUser } from "@components/User";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import sharedStyles from "../../assets/styles/shared.module.scss";

export const UsersPage = () => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  //const [open, openModal, closeModal] = useModal();
  return (
    <>
      <section>
        <h2 className={cxShared("title")}>Пользователи</h2>
        <UserTree />
      </section>

      <section>
        <h2 className={cxShared("title")}>Подробная информация</h2>
        <SelectedUser />
      </section>
      <div className={cx("box")}>Колонка 3</div>
    </>
  );
};
