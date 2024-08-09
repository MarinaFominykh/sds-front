import { FC } from "react";
import { CircularProgress, SelectChangeEvent, MenuItem } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { JobItem } from "./JobItem";
import { Select } from "@components/_shared/Inputs/Select";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IJob } from "@src/types/IJob";
import { IOrg } from "@src/types/IOrg";
import { FormValues } from "@hooks/useFormWithValidation";

interface Props {
  jobs: IJob[];
  orgs: IOrg[];
  values: FormValues;
  handleClick: (id: string) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  isLoading: boolean;
}

export const JobListView: FC<Props> = (props) => {
  const { jobs, orgs, values, handleClick, handleSelectChange, isLoading } =
    props;
  const cx = useStyles(styles);
  return (
    <div className={cx("container")}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Select
            value={(values.id_org as string) || ""}
            onChange={handleSelectChange}
            label="Организация"
            inputProps={{
              name: "id_org",
            }}
          >
            {orgs?.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.full_name}
              </MenuItem>
            ))}
          </Select>
          <SimpleTreeView
            onSelectedItemsChange={(_, id) => handleClick(id ?? "")}
          >
            {jobs?.length > 0 ? (
              jobs.map((job) => <JobItem key={job.id} job={job} />)
            ) : (
              <p className="notfound">Ничего не найдено</p>
            )}
          </SimpleTreeView>
        </>
      )}
    </div>
  );
};
