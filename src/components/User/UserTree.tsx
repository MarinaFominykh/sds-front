import React from "react";
import { Tree } from "@components/User/UserTreeView";
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "@src/redux/services/userApi";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setSelectedUser } from "@src/redux/reducers/UserSlice";
import { IUser } from "@src/types/IUser";

export const UserTree = () => {
  const { data: users } = useGetAllUsersQuery({});
  const { selectedUser } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const handleSelectUser = (id: string | null) => {
    const selectedUser = users?.data.find((user: IUser) => user.id === id);
    dispatch(setSelectedUser(selectedUser));
  };

  return <Tree users={users?.data} handleSelected={handleSelectUser} />;
};
