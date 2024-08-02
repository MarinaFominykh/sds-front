import { useState, useEffect, FC, FormEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import { MoveDeviceView } from "./MoveDeviceView";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { setSelectedLocation } from "@src/redux/reducers/locationSlice";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useEditDevMutation } from "@src/redux/services/devsApi";
import { IOrg } from "@src/types/IOrg";
import { IDev } from "@src/types/IDev";
import { ILocation } from "@src/types/ILocation";

interface Props {
  handleClose: () => void;
}

export const MoveDevice: FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const { data: orgs } = useGetAllOrgsQuery({});
  const [editDev, { data: response, isError, isLoading, isSuccess }] =
    useEditDevMutation();
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  const { resetForm, handleCloseSelect } = useFormValidation();
  const [orgsOptions, setOrgsOptions] = useState<(IOrg | undefined)[]>([
    selectedLocation?.org,
  ]);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    dispatch(
      setSelectedLocation({ ...(selectedLocation as ILocation), [name]: value })
    );
  };
  const handleSelectLocation = (id: string | null) => {
    if (id)
      dispatch(setSelectedDev({ ...(selectedDev as IDev), group_dev_id: id }));
    setDisabled(false);
  };

  const generateArgs = () => {
    const args = {
      group_dev_id: selectedDev?.group_dev_id ?? "",
      number: selectedDev?.number ?? "",
      name: selectedDev?.name ?? "",
      latitude: selectedDev?.latitude ?? "",
      longitude: selectedDev?.longitude ?? "",
      period_sess: selectedDev?.period_sess ?? "",
      info: selectedDev?.info ?? "",
      deleted: selectedDev?.deleted ?? false,
      sensors: `{"s": ${JSON.stringify(selectedDev?.sensors?.s)}}`,
    };
    return args;
  };

  const changeDevice = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    if (args) editDev(args);
  };
  useEffect(() => {
    if (orgs && "data" in orgs) setOrgsOptions(orgs.data);
  }, []);
  useEffect(() => {
    if (isSuccess && !response.error) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  return (
    <form onSubmit={changeDevice} noValidate>
      <MoveDeviceView
        location={selectedLocation}
        orgs={orgsOptions}
        message={message}
        handleSelectChange={handleSelectChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectLocation={handleSelectLocation}
        isErrorSave={isError}
        isSuccessSave={isSuccessSave()}
        isLoading={isLoading}
        isDisabled={disabled}
      />
    </form>
  );
};
