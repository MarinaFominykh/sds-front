import { IDev } from "@src/types/IDev";
import React, { FC } from "react";
import { TabPanel } from "./components/TabPanel";

import { useStyles } from "@hooks/useStyles";
import sharedStyles from "../../../../assets/styles/shared.module.scss";
import styles from "./styles.module.scss";
interface Props {
  dev: IDev | null;
}

export const SelectedDeviceView: FC<Props> = ({ dev }) => {
  const cx = useStyles(styles);
  const cxShared = useStyles(sharedStyles);
  return (
    <>
      <h2 className={cxShared("title")}>Данные по устройству {dev?.number}</h2>
      <TabPanel />
    </>
  );
};
