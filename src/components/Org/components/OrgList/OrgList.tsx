import { ChangeEvent, useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { OrgListView } from "./OrgListView";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useAppDispatch } from "@hooks/redux";
import { setSelectedOrg } from "@src/redux/reducers/orgSlise";
import { IOrg } from "@src/types/IOrg";

export const OrgList = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const { data: orgs, isError, isLoading } = useGetAllOrgsQuery({});
  const [currentOrgs, setCurrentOrgs] = useState(orgs?.data);
  const handleSelectOrg = (id: string) => {
    if (id) {
      const org = orgs?.data?.find((org: IOrg) => org.id === id);
      dispatch(setSelectedOrg(org));
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (orgs?.data) setCurrentOrgs(orgs?.data);
  }, [orgs]);

  useEffect(() => {
    if (searchValue) {
      const filteredOrgs = orgs?.data?.filter((org: IOrg) =>
        org.full_name.includes(searchValue)
      );
      setCurrentOrgs(filteredOrgs);
    } else setCurrentOrgs(orgs?.data);
  }, [searchValue]);

  return (
    <>
      {isError ? (
        <Alert severity="error">Произошла ошибка при загрузке данных</Alert>
      ) : (
        <OrgListView
          isLoading={isLoading}
          orgs={currentOrgs}
          handleClick={handleSelectOrg}
          handleSearch={handleSearch}
        />
      )}
    </>
  );
};
