import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISelectedWell } from "@src/types/IWell";

interface WellState {
  selectedWell: ISelectedWell | null;
  isSelectedWell: boolean;
}

const initialState: WellState = {
  selectedWell: null,
  isSelectedWell: false,
};

export const wellSlice = createSlice({
  name: "well",
  initialState,
  reducers: {
    setSelectedWell: (state, action: PayloadAction<ISelectedWell>) => {
      state.selectedWell = action.payload;
      //state.isSelectedWell = true;
    },
    setIsSelectedWell: (state, action: PayloadAction<boolean>) => {
      state.isSelectedWell = action.payload;
    },
    resetSelectedWell: (state) => {
      state.selectedWell = null;
      state.isSelectedWell = false;
    },
  },
});

export const { setSelectedWell, setIsSelectedWell, resetSelectedWell } =
  wellSlice.actions;
export default wellSlice.reducer;
