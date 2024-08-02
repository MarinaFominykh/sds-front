import { FC } from "react";

import { WellsTree } from "./components/WellsTree";
import { SelectedWell } from "./components/SelectedWell";
import { ILocation } from "@src/types/ILocation";
import { useStyles } from "@hooks/useStyles";

import sharedStyles from "../../assets/styles/shared.module.scss";
interface Props {
  locations: ILocation[];
}
export const WellsView: FC<Props> = () => {
  const cxShared = useStyles(sharedStyles);
  return (
    <>
      <section>
        <h2 className={cxShared("title")}>Скважины</h2>
        <WellsTree />
      </section>
      <section>
        <h2 className={cxShared("title")}>Подробная информация</h2>
        <SelectedWell />
      </section>
    </>
  );
};
