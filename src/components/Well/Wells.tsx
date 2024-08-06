import { WellsView } from "./WellsView";

import { useAppSelector } from "@hooks/redux";

export const Wells = () => {
  const { locationsTree, locations } = useAppSelector(
    (state) => state.locationSlice
  );

  return <WellsView locations={locationsTree} />;
};
