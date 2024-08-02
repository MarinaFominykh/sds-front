//import { Table } from "@components/Modals/NewDevs/components/DragDropFileUpload/DragDropFileUpload";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDev, ISensor } from "@src/types/IDev";
import { ITable } from "@src/types/ITable";

interface DevState {
  devs: IDev[];
  selectedDev: IDev | null;
  // newDev?: IDev;
  newSensors: ISensor[];
  newDevsTable: ITable | null;
  isVisibleDevice: boolean;
}

const initialState: DevState = {
  devs: [],
  selectedDev: null,
  newSensors: [],
  newDevsTable: null,
  isVisibleDevice: false,
};

export const devSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {
    setDevs: (state: DevState, action: PayloadAction<IDev[]>) => {
      state.devs = action.payload;
    },
    setSelectedDev: (state: DevState, action: PayloadAction<IDev>) => {
      state.selectedDev = action.payload;
    },
    // setNewDev: (state: DevState, action: PayloadAction<IDev>) => {
    //   state.newDev = action.payload;
    // },
    setNewSensors: (state: DevState, action: PayloadAction<ISensor[]>) => {
      state.newSensors = action.payload;
    },
    setNewDevsTable: (state: DevState, action: PayloadAction<ITable>) => {
      state.newDevsTable = action.payload;
    },
    setVisibleDevice: (state: DevState, action: PayloadAction<boolean>) => {
      state.isVisibleDevice = action.payload;
    },
  },
});

export const {
  setDevs,
  setSelectedDev,
  setNewSensors,
  setNewDevsTable,
  setVisibleDevice,
} = devSlice.actions;
export default devSlice.reducer;
