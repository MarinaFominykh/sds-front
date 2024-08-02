import { FC } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  period: any;
  isVisible: boolean;
}
export const VerifRange: FC<Props> = ({ period, isVisible }) => {
  const cx = useStyles(styles);

  return (
    <>
      {isVisible && (
        <div className={cx("container")}>
          <p className={cx("title")}>Поверочный интервал</p>
          <div className={cx("content")}>
            {period ? (
              <>
                <div className={cx("text-wrapper")}>
                  <AccessTimeIcon sx={{ color: "#eee", mr: "4px" }} />
                  {moment(period.start_povs).format("DD.MM.YYYY")}

                  <p className={cx("text")}>Начало</p>
                </div>
                <div className={cx("text-wrapper")}>
                  <AccessTimeIcon sx={{ color: "#eee", mr: "4px" }} />
                  {moment(period.end_povs).format("DD.MM.YYYY")}
                  <p className={cx("text")}>Завершение</p>
                </div>
              </>
            ) : (
              <div className={cx("text-wrapper")}>
                <AccessTimeIcon sx={{ color: "#eee", mr: "4px" }} />
                Поверочный интервал не установлен
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
