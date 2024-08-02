import { FC, ChangeEvent } from "react";
import { TextareaAutosize, Alert } from "@mui/material";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { RadioButton } from "@components/_shared/RadioButton";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IUser } from "@src/types/IUser";
import { FormErrors } from "@hooks/useFormWithValidation";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";

interface Props {
  user: IUser | null;
  //orgs: IOrg[] | null;
  //jobs: IJob[] | null;
  //values: FormValues;
  message: string;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  //handleSelectChange: (event: SelectChangeEvent) => void;
  isValidForm: boolean;
  isLoading: boolean;
  isSuccessSave: boolean;
  isErrorSave: boolean;
}
export const EditUserView: FC<Props> = ({
  user,
  //orgs,
  //jobs,
  //values,
  message,
  handleChange,
  //handleSelectChange,
  errors,
  isValidForm,
  isLoading,
  isSuccessSave,
  isErrorSave,
}) => {
  const cx = useStyles(styles);
  const isWrite = user?.roles_ids.roles[1] === 2;

  return (
    <>
      <div className={cx("container")}>
        <InputText
          onChange={handleChange}
          //value={values.family || ""}
          defaultValue={user?.family || ""}
          name="family"
          label="Фамилия"
          error={Boolean(errors.family)}
          helperText={errors.family}
        />
        <InputText
          name="name"
          onChange={handleChange}
          defaultValue={user?.name || ""}
          //value={values.name || ""}
          error={Boolean(errors.name)}
          label="Имя"
          helperText={errors.name}
        />

        <InputText
          onChange={handleChange}
          defaultValue={user?.father || ""}
          //value={values.father || ""}
          required={false}
          name="father"
          label="Отчество"
          error={Boolean(errors.father)}
          helperText={errors.father}
        />
        <InputText
          onChange={handleChange}
          defaultValue={user?.email || ""}
          //value={values.email || ""}
          name="email"
          label="E-mail"
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        {/* <Select
          onChange={handleSelectChange}
          label="Организация*"
          inputProps={{
            name: "id_org",
          }}
          defaultValue={user?.org_id || ""}
          error={Boolean(errors.id_org)}
          helperText={errors.id_org}
        >
          {orgs?.map((org) => (
            <MenuItem key={org.id} value={org.id}>
              {org.full_name}
            </MenuItem>
          ))}
        </Select>
        <Select
          onChange={handleSelectChange}
          label="Должность*"
          inputProps={{
            name: "id_jobs",
          }}
          value={values.id_jobs || ""}
          error={Boolean(errors.id_jobs)}
          helperText={errors.id_jobs}
        >
          {jobs?.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.name}
            </MenuItem>
          ))}
        </Select> */}

        <InputText
          onChange={handleChange}
          defaultValue={user?.login || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12, opacity: "0.5" },
          }}
          name="login"
          label="Логин"
          error={Boolean(errors.login)}
          helperText={errors.login}
        />
        {!isWrite && (
          <>
            <InputText
              onChange={handleChange}
              name="password"
              label="Новый пароль"
              type="password"
              placeholder="Не менее 6 знаков, включая буквы, цифры и спец.символы"
              error={Boolean(errors.newPassword)}
              helperText={errors.password}
              required={false}
            />

            <InputText
              onChange={handleChange}
              name="repeat"
              label="Повторите пароль"
              type="password"
              error={Boolean(errors.repeat)}
              helperText={errors.repeat}
              required={false}
            />
          </>
        )}
        <RadioButton
          defaultValue={user?.roles_ids.roles[0] ? true : false}
          onChange={handleChange}
          name="deleted"
        />

        {/* <Switch
          name="user_w"
          handleChange={handleChecked}
          defaultChecked={user?.roles_ids.roles[1] ? true : false}
        /> */}

        <TextareaAutosize
          name="info"
          minRows={4}
          className="info"
          onChange={handleChange}
          defaultValue={user?.info || ""}
          //value={values.info || ""}
        />
      </div>

      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}
      {isSuccessSave && (
        <Alert className={cx("alert")} severity="success">
          {SAVE_SUCCESS}
        </Alert>
      )}
      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}

      <div className={cx("button")}>
        <Button isLoading={isLoading} disabled={!isValidForm}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
