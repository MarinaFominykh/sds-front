import { FC } from "react";
import { Divider } from "@mui/material";
import CommitIcon from "@mui/icons-material/Commit";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import moment from "moment";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";
import { IDev } from "@src/types/IDev";

interface Props {
  device: IDev | null;
  isVisible: boolean;
}
export const AdditionInfo: FC<Props> = (props) => {
  const {
    device,

    isVisible,
  } = props;
  const cx = useStyles(styles);
  return (
    <>
      {isVisible && Boolean(device?.control_sess) && (
        <div className={cx("container")}>
          <p className={cx("title")}>Дополнительная информация</p>
          <div className={cx("content")}>
            <div className={cx("row")}>
              <CommitIcon sx={{ color: "#00b394" }} />
              <p className={cx("text")}>
                {moment(device?.control_sess?.time_srv).format("DD.MM.YYYY")}{" "}
                {moment(device?.control_sess?.time_srv).format("kk:mm")}
              </p>
              <p className={cx("description")}>(контрольная сессия)</p>
            </div>
            <div className={cx("row")}>
              <CommitIcon sx={{ color: "#8e66fb" }} />
              <p className={cx("text")}>
                {moment(device?.last_sess?.time_srv).format("DD.MM.YYYY")}{" "}
                {moment(device?.last_sess?.time_srv).format("kk:mm")}
              </p>
              <p className={cx("description")}>(последняя сессия)</p>
            </div>
            {device?.selectedSession && (
              <div className={cx("row")}>
                <CommitIcon sx={{ color: "#fd8a04" }} />
                <p className={cx("text")}>
                  {moment(device.selectedSession.time_srv).format("DD.MM.YYYY")}{" "}
                  {moment(device.selectedSession.time_srv).format("kk:mm")}
                </p>
                <p className={cx("description")}>(выбранная сессия)</p>
              </div>
            )}
            <Divider sx={{ m: "8px" }} />
            <div className={cx("row")}>
              <Battery0BarIcon sx={{ color: "#aaa" }} />
              <p className={cx("text")}>{device?.control_sess?.level_akb}</p>
              <p className={cx("description")}>(заряд - контрольная сессия)</p>
            </div>
            <div className={cx("row")}>
              <Battery0BarIcon sx={{ color: "#aaa" }} />
              <p className={cx("text")}>{device?.last_sess?.level_akb}</p>
              <p className={cx("description")}>(заряд - последняя сессия)</p>
            </div>
            {device?.selectedSession && (
              <div className={cx("row")}>
                <Battery0BarIcon sx={{ color: "#aaa" }} />
                <p className={cx("text")}>
                  {device?.selectedSession?.level_akb}
                </p>
                <p className={cx("description")}>(заряд - выбранная сессия)</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
