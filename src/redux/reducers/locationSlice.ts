import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILocation } from "@src/types/ILocation";

interface LocationState {
  locations: ILocation[] | [];
  locationsTree: any[] | [];
  selectedLocation: ILocation | null;
  isSelected: boolean;
  isLoadingScheme: boolean;
  newScheme?: string;
}

const initialState: LocationState = {
  locations: [],
  locationsTree: [],
  selectedLocation: null,
  isSelected: false,
  isLoadingScheme: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<ILocation[]>) => {
      state.locations = action.payload;
    },
    setLocationsTree: (state, action: PayloadAction<any[]>) => {
      state.locationsTree = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<ILocation | null>) => {
      state.selectedLocation = action.payload;
    },
    setIsSelected: (state, action: PayloadAction<boolean>) => {
      state.isSelected = action.payload;
    },
    setIsLoadingScheme: (state, action: PayloadAction<boolean>) => {
      state.isLoadingScheme = action.payload;
    },
    setNewScheme: (state, action: PayloadAction<string>) => {
      state.newScheme = action.payload;
    },
  },
});

export const {
  setLocations,
  setLocationsTree,
  setSelectedLocation,
  setIsSelected,
  setIsLoadingScheme,
  setNewScheme,
} = locationSlice.actions;
export default locationSlice.reducer;
