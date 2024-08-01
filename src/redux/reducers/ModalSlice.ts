import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { eVariantModal } from "@src/types/EvariantModal";
interface ModalState {
  title: string;
  variant: eVariantModal | null;
  subVariant?: eVariantModal | null;
}
const initialState: ModalState = {
  title: "",
  variant: null,
  subVariant: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setVariant: (state, action: PayloadAction<ModalState>) => {
      state.variant = action.payload.variant;
      state.title = action.payload.title;
    },
    setSubVariant: (state, action: PayloadAction<any>) => {
      state.subVariant = action.payload.subVariant;
    },
  },
});

export const { setVariant, setSubVariant } = modalSlice.actions;

export default modalSlice.reducer;
