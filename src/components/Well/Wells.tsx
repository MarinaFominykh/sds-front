import { WellsView } from "./WellsView";

import { useAppSelector } from "@hooks/redux";

export const Wells = () => {
  const { locationsTree } = useAppSelector((state) => state.locationSlice);

  return <WellsView locations={locationsTree} />;
};
