import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Chart } from "../Chart/Chart";
import { AboutDevPanel } from "../AboutDevPanel";
import { CriticatilyTab } from "../CriticalityTab";
import { SelectedSessionTab } from "../SelectedSessionTab";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { SessionTab } from "../SessionsTab";

interface PanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabPanelViewProps {
  isSelectedSession: boolean;
}
function Panel(props: PanelProps) {
  const { children, value, index, ...other } = props;
  const cx = useStyles(styles);
  return (
    <div
      className={cx("panel")}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const TabPanelView = (props: TabPanelViewProps) => {
  const { isSelectedSession } = props;
  const cx = useStyles(styles);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={cx("tab-container")}>
      <Tabs
        className={cx("head")}
        value={value}
        onChange={handleChangeTab}
        sx={{
          "& .MuiBox-root": {
            border: "1px green solid",
          },
        }}
      >
        <Tab sx={{ fontSize: "10px" }} label="Устройство" />
        <Tab sx={{ fontSize: "10px" }} label="Сессии за период" />

        <Tab
          sx={{ fontSize: "10px" }}
          label="Контроль критичности отклонений"
        />
        <Tab
          sx={{ fontSize: "10px" }}
          label="Выбранная сессия"
          disabled={!isSelectedSession}
        />
      </Tabs>
      <div className="content">
        <Panel value={value} index={0}>
          <AboutDevPanel />
        </Panel>
        <Panel value={value} index={1}>
          <SessionTab />
        </Panel>
        <Panel value={value} index={2}>
          <CriticatilyTab />
        </Panel>
        <Panel value={value} index={3}>
          <SelectedSessionTab />
        </Panel>
        <Chart />
      </div>
    </div>
  );
};
