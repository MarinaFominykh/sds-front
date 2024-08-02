import { ChangeEvent, SyntheticEvent, FC } from "react";
import {
  SelectChangeEvent,
  MenuItem,
  TextareaAutosize,
  Alert,
} from "@mui/material";
import { Select } from "@components/_shared/Inputs/Select";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { FormValues } from "@hooks/useFormWithValidation";
import { IOrg } from "@src/types/IOrg";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleCloseSelect: (
    event: SyntheticEvent<Element, Event>,
    name: string
  ) => void;
  values: FormValues;
  errors: { [name: string]: string };
  orgs: IOrg[];
  isValid: boolean;
  successSave: boolean;
  errorSave: boolean;
  isLoadind: boolean;
}

export const NewJobView: FC<Props> = ({
  handleChange,
  handleSelectChange,
  handleCloseSelect,
  values,
  errors,
  orgs,
  isValid,
  successSave,
  errorSave,
  isLoadind,
}) => {
  const cx = useStyles(styles);
  const isValidForm = () => {
    return isValid && Boolean(values.id_org);
  };

  return (
    <div className={cx("container")}>
      <fieldset className={cx("input-container")}>
        <Select
          onChange={handleSelectChange}
          onClose={(e) => handleCloseSelect(e, "id_org")}
          label="Организация"
          inputProps={{
            name: "id_org",
          }}
          value={String(values.id_org) || ""}
          error={Boolean(errors.id_org)}
          helperText={errors.id_org}
        >
          {orgs?.map((org) => (
            <MenuItem key={org.id} value={org.id}>
              {org.full_name}
            </MenuItem>
          ))}
        </Select>
        <InputText
          onChange={handleChange}
          name="name"
          label="Должность"
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextareaAutosize
          onChange={handleChange}
          name="info"
          className="info"
          minRows={4}
        />
      </fieldset>
      {successSave && <Alert severity="success">{SAVE_SUCCESS}</Alert>}
      {errorSave && <Alert severity="error">{SAVE_ERROR}</Alert>}
      <div className={cx("button")}>
        <Button disabled={!isValidForm()} isLoading={isLoadind}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
