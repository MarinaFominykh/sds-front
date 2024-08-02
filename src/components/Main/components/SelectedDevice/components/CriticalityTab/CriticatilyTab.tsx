import { CriticatilyTabView } from "./CriticatilyTabView";
import { useAppSelector } from "@hooks/redux";

export const CriticatilyTab = () => {
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  return <>{selectedDev && <CriticatilyTabView selectedDev={selectedDev} />}</>;
};
