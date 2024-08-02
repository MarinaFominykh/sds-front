import { YMaps, Map as MapComponent, Placemark } from "@pbe/react-yandex-maps";
import { Link } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

export const Map = () => {
  const cx = useStyles(styles);
  const navigate = useNavigate();
  let [searchParams, _] = useSearchParams();
  const goBack = () => {
    navigate(-1);
  };

  const position = [
    Number(searchParams.get("lng")),
    Number(searchParams.get("lat")),
  ];

  return (
    <section className={cx("container")}>
      <Link
        className={cx("link")}
        underline="hover"
        component="button"
        onClick={goBack}
        variant="subtitle2"
      >
        <DirectionsIcon className={cx("icon")} />
        Назад
      </Link>

      <YMaps>
        <MapComponent
          state={{
            center: position,
            zoom: 13,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Placemark geometry={position} />
        </MapComponent>
      </YMaps>
    </section>
  );
};
