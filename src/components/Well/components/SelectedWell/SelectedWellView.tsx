import { MouseEvent, FC } from "react";
import { IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditWellMenu } from "../EditWellMenu";
import { InputText } from "@components/_shared/Inputs/InputText";
import { eVariantModal } from "@src/types/EvariantModal";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import sharedStyles from "../../../../assets/styles/shared.module.scss";
import { ISelectedWell, IWell } from "@src/types/IWell";

interface Props {
  well: ISelectedWell;
  anchorEl: HTMLElement | null;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  handleClickMenuButton: (event: MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  isOpenMenu: boolean;
}
export const SelectedWellView: FC<Props> = (props) => {
  const {
    well,
    anchorEl,
    handleClickMenuButton,
    handleOpenModal,
    closeMenu,
    isOpenMenu,
  } = props;
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  return (
    <div className={cx("container")}>
      <div className={cx("head")}>
        <IconButton
          onClick={handleClickMenuButton}
          aria-controls={isOpenMenu ? "editWellMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenMenu ? "true" : undefined}
        >
          <MoreVertIcon />
        </IconButton>
        <EditWellMenu
          anchorEl={anchorEl}
          isOpen={isOpenMenu}
          onClose={closeMenu}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <fieldset className={cx("fields")}>
        <InputText
          label="Номер скважины"
          value={well?.number || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Расположениe"
          value={well?.location?.g_name || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Организация"
          value={well?.org?.full_name || ""}
          //onChange={handleChange}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Устройство"
          value={well?.device?.name || ""}
          //onChange={handleChange}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
      </fieldset>
    </div>
  );
};
