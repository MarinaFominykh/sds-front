import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOrg } from "@src/types/IOrg";

interface OrgState {
  selectedOrg: IOrg | null;
  isSelectedOrg: boolean;
}

const initialState: OrgState = {
  selectedOrg: null,
  isSelectedOrg: false,
};

export const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    setSelectedOrg: (state, action: PayloadAction<IOrg>) => {
      state.selectedOrg = action.payload;
      state.isSelectedOrg = true;
    },
    resetSelectedWell: (state) => {
      state.selectedOrg = null;
      state.isSelectedOrg = false;
    },
  },
});

export const { setSelectedOrg, resetSelectedWell } = orgSlice.actions;

export default orgSlice.reducer;
