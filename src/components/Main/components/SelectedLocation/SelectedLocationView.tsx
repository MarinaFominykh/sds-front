import { FC, MouseEvent } from "react";
import { IconButton } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Scheme } from "./components/Scheme";
import { EditLocationMenu } from "./components/EditLocationMenu";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { eVariantModal } from "@src/types/EvariantModal";
import { ILocation } from "@src/types/ILocation";
import { Link } from "react-router-dom";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import sharedStyles from "../../../../assets/styles/shared.module.scss";
interface Props {
  location: ILocation | null;
  anchorEl: HTMLElement | null;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  handleClickMenuButton: (event: MouseEvent<HTMLButtonElement>) => void;
  closeMenu: () => void;
  isOpenMenu: boolean;
  isScheme: boolean;
  isLoading: boolean;
}

export const SelectedLocationView: FC<Props> = (props) => {
  const {
    location,
    anchorEl,
    isOpenMenu,
    handleClickMenuButton,
    closeMenu,
    handleOpenModal,
    isScheme,
    ...other
    //handleChange,
  } = props;
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  return (
    <div className={cx("container")}>
      <div className={cx("fields-container")}>
        <div className={cx("head")}>
          <IconButton
            onClick={handleClickMenuButton}
            aria-controls={isOpenMenu ? "editLocationMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpenMenu ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <EditLocationMenu
            anchorEl={anchorEl}
            isOpen={isOpenMenu}
            onClose={closeMenu}
            handleOpenModal={handleOpenModal}
            location={location}
          />
        </div>
        <fieldset className={cx("fields")}>
          <InputText
            label="Место расположения"
            value={location?.g_name || ""}
            //onChange={handleChange}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Широта"
            value={location?.latitude || ""}
            //onChange={handleChange}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Долгота"
            value={location?.longitude || ""}
            //onChange={handleChange}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Информация"
            value={location?.g_info || ""}
            // onChange={handleChange}
            required={false}
            multiline={true}
            rows={4}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
        </fieldset>
        <div className={cx("link-container")}>
          <Link
            to={`${ScreenRoute.MAP}?lng=${location?.latitude}&lat=${location?.longitude}`}
            className={cx("link")}
          >
            Показать на карте
            <DirectionsIcon />
          </Link>
        </div>
      </div>
      {isScheme && (
        <>
          <h2 className={cxShared("title")}>
            Схема расположения устройств на полигоне
          </h2>
          <Scheme {...other} />
        </>
      )}
    </div>
  );
};
