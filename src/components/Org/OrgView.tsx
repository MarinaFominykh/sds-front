import { OrgList } from "./components/OrgList/OrgList";
import { SelectedOrg } from "./components/SelectedOrg";
import { useStyles } from "@hooks/useStyles";

import sharedStyles from "../../assets/styles/shared.module.scss";

export const OrgView = () => {
  const cxShared = useStyles(sharedStyles);
  return (
    <>
      <section>
        <h2 className={cxShared("title")}>Организации</h2>
        <OrgList />
        {/* <WellsTree /> */}
      </section>
      <section>
        <h2 className={cxShared("title")}>Подробная информация</h2>
        <SelectedOrg />
      </section>
    </>
  );
};
