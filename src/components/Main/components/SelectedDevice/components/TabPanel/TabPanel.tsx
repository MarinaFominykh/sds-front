import { TabPanelView } from "./TabPanelView";
import { useAppSelector } from "@hooks/redux";

export const TabPanel = () => {
  const { selectedDev } = useAppSelector((state) => state.devSlice);

  return (
    <TabPanelView isSelectedSession={Boolean(selectedDev?.selectedSession)} />
  );
};
