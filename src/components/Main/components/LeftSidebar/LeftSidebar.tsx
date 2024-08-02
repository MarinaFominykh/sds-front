import { useAppSelector } from "@hooks/redux";
import { useGetVerifRangeQuery } from "@src/redux/services/devsApi";
import { InfoSticker } from "../InfoSticker";
import { InfoPassedDays } from "../InfoPassedDays";
import { VerifRange } from "../VerifRange";
import { SessionPeriod } from "../SessionPeriod";
import { AdditionInfo } from "../AdditionInfo";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

export const LeftSidebar = () => {
  const cx = useStyles(styles);

  const { selectedDev, isVisibleDevice } = useAppSelector(
    (state) => state.devSlice
  );
  const { data: periodSess } = useGetVerifRangeQuery(
    {
      dev_id: selectedDev?.id,
      dev_number: selectedDev?.number,
    },
    { skip: !Boolean(selectedDev) }
  );

  return (
    <div className={cx("container")}>
      <InfoSticker />
      <InfoPassedDays
        timeSession={selectedDev?.last_sess?.time_srv}
        isTimeSession={Boolean(selectedDev?.last_sess?.time_srv)}
        isVisible={isVisibleDevice}
      />
      <SessionPeriod isVisible={isVisibleDevice} selectedDev={selectedDev} />
      <AdditionInfo isVisible={isVisibleDevice} device={selectedDev} />
      <VerifRange isVisible={isVisibleDevice} period={periodSess?.data?.[0]} />
    </div>
  );
};
