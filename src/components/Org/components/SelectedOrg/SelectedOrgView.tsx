import { MouseEvent, FC } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditOrgMenu } from "../EditOrgMenu";
import { InputText } from "@components/_shared/Inputs/InputText";
import { eVariantModal } from "@src/types/EvariantModal";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

import { IOrg } from "@src/types/IOrg";

interface Props {
  org: IOrg;
  anchorEl: HTMLElement | null;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  handleClickMenuButton: (event: MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  isOpenMenu: boolean;
}
export const SelectedOrgView: FC<Props> = (props) => {
  const {
    org,
    anchorEl,
    handleClickMenuButton,
    handleOpenModal,
    closeMenu,
    isOpenMenu,
  } = props;
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      <div className={cx("head")}>
        <IconButton
          onClick={handleClickMenuButton}
          aria-controls={isOpenMenu ? "editOrgMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenMenu ? "true" : undefined}
        >
          <MoreVertIcon />
        </IconButton>
        <EditOrgMenu
          anchorEl={anchorEl}
          isOpen={isOpenMenu}
          onClose={closeMenu}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <fieldset className={cx("fields")}>
        <InputText
          label="Полное наименование"
          value={org.full_name || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Сокращенное наименование"
          value={org.name || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="ИНН"
          value={org.inn || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Адрес"
          value={org.address || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          name="info"
          label="Информация"
          value={org?.info || ""}
          multiline={true}
          rows={4}
          required={false}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
      </fieldset>
    </div>
  );
};
