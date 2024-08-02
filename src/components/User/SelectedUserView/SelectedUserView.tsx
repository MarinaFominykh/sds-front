import { FC, MouseEvent } from "react";
import { TextareaAutosize, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InputText } from "@components/_shared/Inputs/InputText";
import { EditUserMenu } from "../EditUserMenu";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";
import { IUser } from "@src/types/IUser";

interface Props {
  user: IUser | null;
  anchorEl: HTMLElement | null;
  handleOpenModal: () => void;
  handleClickMenuButton: (event: MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  isOpenMenu: boolean;
}
export const SelectedUserView: FC<Props> = ({
  user,
  anchorEl,
  handleOpenModal,
  handleClickMenuButton,
  closeMenu,
  isOpenMenu,
}) => {
  const cx = useStyles(styles);

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const isOpenMenu = Boolean(anchorEl);
  // const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <div className={cx("container")}>
      <div className={cx("fields-container")}>
        <div className={cx("head")}>
          <IconButton
            onClick={handleClickMenuButton}
            aria-controls={isOpenMenu ? "editUserMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpenMenu ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <EditUserMenu
            anchorEl={anchorEl}
            isOpen={isOpenMenu}
            onClose={closeMenu}
            handleOpenModal={handleOpenModal}
          />
        </div>

        <fieldset className={cx("fields")}>
          <InputText
            label="Фамилия"
            value={user?.family || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Имя"
            value={user?.name || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Отчество"
            value={user?.father || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="E-mail"
            value={user?.email || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Логин"
            value={user?.login || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Состояние записи"
            value={user?.deleted ? "Пользователь удален" : "Действующая"}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <TextareaAutosize
            value={user?.info || ""}
            minRows={4}
            className="info"
            readOnly
          />
        </fieldset>
      </div>
    </div>
  );
};
