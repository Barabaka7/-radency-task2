import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getNotes, Note } from "../../utilities/fetchingData";

const loadNotes = () => {
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

// Slice Object
///////////////////////////////////////

export const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    loadAllNotes: (state: Note[], action: ILoadNotes) => {
      state = action.payload;
    },
    addNote: (state: Note[], action: IAddNote) => {
      state.push(action.payload);
    },
    editNote: (state: Note[], action: IEditNote) => {
      state[state.findIndex((n) => n.id === action.payload.id)] =
        action.payload;
    },
    deleteNote: (state: Note[], action: IDeleteNote) => {
      state.splice(
        state.findIndex((n) => n.id === action.payload),
        1
      );
    },
    archiveNote: (state: Note[], action: IArchiveNote) => {
      state.filter((n) => n.id === action.payload)[0].isArchived = true;
    },
    unarchiveNote: (state: Note[], action: IArchiveNote) => {
      state.filter((n) => n.id === action.payload)[0].isArchived = false;
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectAllNotes = (state: Note[]) => state;

export const selectNoteById = (state: Note[], id: number) =>
  state.filter((n) => n.id === id)[0];

export const selectNoteByCategory = (state: Note[], cat: number) =>
  state.filter((n) => n.category === cat);

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
