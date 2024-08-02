import { SelectedSessionTabView } from "./SelectedSessionTabView";
import { useAppSelector } from "@hooks/redux";

export const SelectedSessionTab = () => {
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  return (
    <> {selectedDev && <SelectedSessionTabView selectedDev={selectedDev} />} </>
  );
};
