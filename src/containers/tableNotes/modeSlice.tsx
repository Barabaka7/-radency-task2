import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";

// Interfaces

interface IModeActions {
  SWITCH_MODE: string;
}

interface ISwitchMode {
  type: IModeActions["SWITCH_MODE"];
  payload: string;
}

const initialState: string = "active";

// Slice Object
///////////////////////////////////////
export const modeSlice = createSlice({
  name: "mode",
  initialState: initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<string>) => {
      return (state = action.payload);
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectMode = (state: RootState) => state.mode;

// Exports
///////////////////////////////////////
export const { switchMode } = modeSlice.actions;

export default modeSlice.reducer;
