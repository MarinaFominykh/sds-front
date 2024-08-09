import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISelectedJob } from "@src/types/IJob";

interface JobState {
  selectedJob: ISelectedJob | null;
  isSelectedJob: boolean;
}

const initialState: JobState = {
  selectedJob: null,
  isSelectedJob: false,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSelectedJob: (state, action: PayloadAction<ISelectedJob>) => {
      state.selectedJob = action.payload;
      state.isSelectedJob = true;
    },
    resetSelectedJob: (state) => {
      state.selectedJob = null;
      state.isSelectedJob = false;
    },
  },
});

export const { setSelectedJob, resetSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
