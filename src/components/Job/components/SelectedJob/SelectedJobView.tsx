import { MouseEvent, FC } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditJobMenu } from "../EditJobMenu";
import { InputText } from "@components/_shared/Inputs/InputText";
import { eVariantModal } from "@src/types/EvariantModal";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { ISelectedJob } from "@src/types/IJob";

interface Props {
  job: ISelectedJob;
  anchorEl: HTMLElement | null;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  handleClickMenuButton: (event: MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  isOpenMenu: boolean;
}

export const SelectedJobView: FC<Props> = (props) => {
  const {
    job,
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
          aria-controls={isOpenMenu ? "editJobMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenMenu ? "true" : undefined}
        >
          <MoreVertIcon />
        </IconButton>
        <EditJobMenu
          anchorEl={anchorEl}
          isOpen={isOpenMenu}
          onClose={closeMenu}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <fieldset className={cx("fields")}>
        <InputText
          label="Наименование должности"
          value={job?.name || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Организация"
          value={job?.org.full_name || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
        <InputText
          label="Информация"
          value={job?.info || ""}
          multiline={true}
          rows={4}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12 },
          }}
        />
      </fieldset>
    </div>
  );
};
