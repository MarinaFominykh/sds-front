import { MouseEvent } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { InputText } from "@components/_shared/Inputs/InputText";
import { IDev } from "@src/types/IDev";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { eVariantModal } from "@src/types/EvariantModal";
import { EditDeviceMenu } from "../EditDeviceMenu";

interface Props {
  device: IDev | null;
  location: string;
  anchorEl: HTMLElement | null;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  handleClickMenuButton: (event: MouseEvent<HTMLButtonElement>) => void;
  onCloseMenu: () => void;
  isOpenMenu: boolean;
  isAdmin: boolean;
}
export const AboutDevPanelView = (props: Props) => {
  const {
    device,
    location,
    handleClickMenuButton,
    isOpenMenu,
    isAdmin,
    ...other
  } = props;
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      <div className={cx("fields-container")}>
        {isAdmin && (
          <div className={cx("head")}>
            <IconButton
              onClick={handleClickMenuButton}
              aria-controls={isOpenMenu ? "editDeviceMenu" : undefined}
              aria-haspopup="true"
              aria-expanded={isOpenMenu ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
            <EditDeviceMenu
              {...other}
              isOpenMenu={isOpenMenu}
              device={device}
            />
          </div>
        )}

        <fieldset className={cx("fields-full")}>
          <InputText
            label="Место расположения"
            value={location || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Название устройства"
            value={device?.name || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Номер устройства"
            value={device?.number || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
        </fieldset>
        <fieldset className={cx("fields-position")}>
          <InputText
            label="Широта"
            value={device?.latitude || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
          <InputText
            label="Широта"
            value={device?.longitude || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
        </fieldset>
        <fieldset className={cx("fields-full")}>
          <InputText
            label="Информация"
            required={false}
            value={device?.info || ""}
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
            to={`${ScreenRoute.MAP}?lng=${device?.latitude}&lat=${device?.longitude}`}
            className={cx("link")}
          >
            Показать на карте
            <DirectionsIcon />
          </Link>
        </div>
        <YMaps>
          <Map
            state={{
              center: [Number(device?.latitude), Number(device?.longitude)],
              zoom: 13,
            }}
            style={{ width: "100%", height: "300px" }}
          >
            <Placemark
              geometry={[Number(device?.latitude), Number(device?.longitude)]}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};
