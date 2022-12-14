import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";

// Interfaces

interface IFormState {
  createMode: boolean;
  noteId?: number;
}

const initialState: IFormState = {
  createMode: false,
};

// Slice Object
///////////////////////////////////////
export const formStateSlice = createSlice({
  name: "formState",
  initialState: initialState,
  reducers: {
    switchFormState: (state, action: PayloadAction<boolean>) => {
      state.createMode = action.payload;
      if (action.payload === true) {
        state.noteId = undefined;
      }
    },
    setNoteToEditId: (state, action: PayloadAction<IFormState>) => {
      state.createMode = action.payload.createMode;
      state.noteId = action.payload.noteId;
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectFormState = (state: RootState) => state.formState.createMode;

export const selectFormNoteId = (state: RootState) => state.formState.noteId;

// Exports
///////////////////////////////////////
export const { switchFormState, setNoteToEditId } = formStateSlice.actions;

export default formStateSlice.reducer;
