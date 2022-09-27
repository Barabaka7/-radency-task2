import { createSlice } from "@reduxjs/toolkit";

// Interfaces

interface IModeActions {
  SWITCH_MODE: string;
}

interface ISwitchMode {
  type: IModeActions["SWITCH_MODE"];
  payload: string;
}

// Slice Object
///////////////////////////////////////
export const modeSlice = createSlice({
  name: "mode",
  initialState: "active",
  reducers: {
    switchMode: (state: string, action: ISwitchMode) => {
      state = action.payload;
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectMode = (state: string) => state;

// Exports
///////////////////////////////////////
export const { switchMode } = modeSlice.actions;

export default modeSlice.reducer;
