import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getNotes, Note } from "../../utilities/fetchingData";
import { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export const loadNotes = () => {
  return async (dispatch: Dispatch) => {
    const notes = await getNotes();
    dispatch({ type: "notes/loadAllNotes", payload: notes });
  };
};

// Interfaces

interface INoteActions {
  LOAD_ALL_NOTES: string;
  ADD_NOTE: string;
  EDIT_NOTE: string;
  DELETE_NOTE: string;
  ARCHIVE_NOTE: string;
  UNARCHIVE_NOTE: string;
}

interface ILoadNotes {
  type: INoteActions["LOAD_ALL_NOTES"];
  payload: Note[];
}

interface IAddNote {
  type: INoteActions["ADD_NOTE"];
  payload: Note;
}

interface IEditNote {
  type: INoteActions["EDIT_NOTE"];
  payload: Note;
}

interface IDeleteNote {
  type: INoteActions["DELETE_NOTE"];
  payload: number;
}

interface IArchiveNote {
  type: INoteActions["ARCHIVE_NOTE"];
  payload: number;
}

interface IUnarchiveNote {
  type: INoteActions["ARCHIVE_NOTE"];
  payload: number;
}

// Define the initial state using that type
const initialState: [] | Note[] = [];

// Slice Object
///////////////////////////////////////

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    loadAllNotes: (state, action: PayloadAction<Note[]>) => {
      state = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      const newNote: Note = action.payload;
      // state.push(newNote);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      state[state.findIndex((n: Note) => n.id === action.payload.id)] =
        action.payload;
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.splice(
        state.findIndex((n: Note) => n.id === action.payload),
        1
      );
    },
    archiveNote: (state, action: PayloadAction<number>) => {
      state.filter((n: Note) => n.id === action.payload)[0].isArchived = true;
    },
    unarchiveNote: (state, action: PayloadAction<number>) => {
      state.filter((n: Note) => n.id === action.payload)[0].isArchived = false;
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectAllNotes = (state: RootState) => state.notes;

export const selectNoteById = (state: RootState, id: number) =>
  state.notes.filter((n: Note) => n.id === id)[0];

export const selectNoteByCategory = (state: RootState, cat: number) =>
  state.notes.filter((n: Note) => n.category === cat);

// Exports
///////////////////////////////////////
export const {
  loadAllNotes,
  addNote,
  editNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} = notesSlice.actions;

export default notesSlice.reducer;
