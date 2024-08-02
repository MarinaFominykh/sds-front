import { IUser } from "@src/types/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
  code: string | null;
  isAuthChecked: boolean;
  selectedUser: IUser | null;
}

const initialState: UserState = {
  user: null,
  code: null,
  isAuthChecked: false,
  selectedUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setSelectedUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { authChecked, setUser, setCode, removeUser, setSelectedUser } =
  userSlice.actions;

export default userSlice.reducer;
