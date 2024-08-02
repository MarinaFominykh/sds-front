import { useState, useEffect, SyntheticEvent, FC } from "react";
import { SelectChangeEvent } from "@mui/material";
import { MoveLocationView } from "./MoveLocationView";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useEditLocationMutation } from "@src/redux/services/locacationApi";
import { setSelectedLocation } from "@src/redux/reducers/locationSlice";
import { IOrg } from "@src/types/IOrg";
import { ILocation } from "@src/types/ILocation";

interface Props {
  handleClose: () => void;
}
export const MoveLocatiton: FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const { data: orgs } = useGetAllOrgsQuery({});
  const [editLocation, { isError, isLoading, isSuccess }] =
    useEditLocationMutation();
  const { resetForm, handleCloseSelect } = useFormValidation();
  const [orgsOptions, setOrgsOptions] = useState<(IOrg | undefined)[]>([
    selectedLocation?.org,
  ]);
  const [message, setMessage] = useState("");
  const [parent, setParent] = useState(selectedLocation?.parent_id);
  const isRootLocation = selectedLocation?.parent_id === "0";
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    dispatch(
      setSelectedLocation({ ...(selectedLocation as ILocation), [name]: value })
    );
  };
  const handleSelectLocation = (id: string | null) => {
    if (id) setParent(id);
    //dispatch(setSelectedLocation({ ...selectedLocation, parent_id: id }));
  };

  const generateArgs = (id: string) => {
    const args = {
      id: selectedLocation?.id ?? "",
      parent_id: id,
      g_name: selectedLocation?.g_name ?? "",
      latitude: selectedLocation?.latitude ?? "",
      longitude: selectedLocation?.longitude ?? "",
      org_id: selectedLocation?.org_id ?? "",
      deleted: selectedLocation?.deleted ?? false,
      g_info: selectedLocation?.g_info ?? "",
    };
    return args;
  };
  const moveLocation = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    const args =
      event?.nativeEvent?.submitter?.textContent === "Переместить в корень"
        ? generateArgs("0")
        : generateArgs(parent || "");

    editLocation(args).then((res) => {
      if ("data" in res && res.data?.data?.error) {
        setMessage("Произошла ошибка при сохранении данных");
      }
    });
  };
  useEffect(() => {
    if (orgs && "data" in orgs) setOrgsOptions(orgs.data);
  }, []);
  //useEffect(() => {}, [values.org_id]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  return (
    <form onSubmit={moveLocation} noValidate>
      <MoveLocationView
        location={selectedLocation}
        orgs={orgsOptions}
        message={message}
        handleSelectChange={handleSelectChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectLocation={handleSelectLocation}
        isErrorSave={isError}
        isSuccessSave={isSuccess}
        isLoading={isLoading}
        isRootLocation={isRootLocation}
      />
    </form>
  );
};
