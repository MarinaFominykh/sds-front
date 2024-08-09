import { JobList } from "./components/JobList/JobList";
import { SelectedJob } from "./components/SelectedJob";
import { useStyles } from "@hooks/useStyles";

import sharedStyles from "../../assets/styles/shared.module.scss";

const cxShared = useStyles(sharedStyles);
export const JobView = () => {
  return (
    <>
      <section>
        <h2 className={cxShared("title")}>Должности</h2>
        <JobList />
      </section>
      <section>
        <h2 className={cxShared("title")}>Подробная информация</h2>
        <SelectedJob />
      </section>
    </>
  );
};
