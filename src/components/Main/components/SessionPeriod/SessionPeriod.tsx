import { FC } from "react";
import { Typography } from "@mui/material";
import LeakAddIcon from "@mui/icons-material/LeakAdd";

import { IDev } from "@src/types/IDev";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  isVisible: boolean;
  selectedDev: IDev | null;
}
export const SessionPeriod: FC<Props> = ({ isVisible, selectedDev }) => {
  const cx = useStyles(styles);

  const getText = (period: string | undefined) => {
    if (period) {
      if (period === "1") {
        return "один раз в день";
      } else if (period === "7") {
        return "один раз в 7 дней";
      } else if (period === "14") {
        return "один раз в 14 дней";
      } else if (period === "31") {
        return "один раз в 30 (31) дней";
      } else return "не установлен";
    }
  };
  return (
    <>
      {isVisible && (
        <div className={cx("container")}>
          <LeakAddIcon sx={{ color: "#808080", mr: "5px" }} />
          <div>
            <Typography
              sx={{ fontSize: "12px", color: "#4a4b42", fontWeight: "700" }}
            >
              Период передачи сессии:
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#4a4b42", fontWeight: "700" }}
            >
              {getText(selectedDev?.period_sess)}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
