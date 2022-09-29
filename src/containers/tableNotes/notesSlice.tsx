import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getNotes, Note } from "../../utilities/fetchingData";
import { customAlphabet } from "nanoid/non-secure";
import { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";

export const loadNotes = () => {
  return async (dispatch: Dispatch) => {
    const notes = await getNotes();
    dispatch(loadAllNotes(notes));
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

// Define the initial state using that type
const initialState: Note[] = [];

// Slice Object
///////////////////////////////////////

export const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    loadAllNotes: (state, action: PayloadAction<Note[]>) => {
      return (state = action.payload);
    },
    addNote: {
      reducer: (state, action: PayloadAction<Note>) => {
        const newNote = action.payload;
        state.push(newNote);
      },
      prepare: (almostNote: Omit<Note, "id">) => {
        const nanoid = customAlphabet("1234567890", 10);
        const id = Number(nanoid());
        return { payload: { id: id, ...almostNote } };
      },
    },
    updateNote: (
      state,
      action: PayloadAction<
        Pick<Note, "id" | "noteName" | "category" | "noteContent">
      >
    ) => {
      const indexToUpdate = state.findIndex(
        (n: Note) => n.id === action.payload.id
      );
      state[indexToUpdate] = { ...state[indexToUpdate], ...action.payload };
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
    archiveAllNotes: (state) => {
      state.map((n: Note) => n.isArchived === true);
    },
    unarchiveAllNotes: (state) => {
      state.map((n: Note) => n.isArchived === false);
    },
    deleteAllNotes: (state) => {
      state.length = 0;
    },
  },
});

// Selectors
///////////////////////////////////////
export const selectAllNotes = (state: RootState) => state.notes;

export const selectNoteById = (id: number) => (state: RootState) =>
  state.notes.filter((n: Note) => n.id === id)[0];

export const selectNoteByCategory = (cat: number) => (state: RootState) =>
  state.notes.filter((n: Note) => n.category === cat);

export const selectActiveNotes = (state: RootState) =>
  state.notes.filter((n: Note) => !n.isArchived);

export const selectArchivedNotes = (state: RootState) =>
  state.notes.filter((n: Note) => n.isArchived);

// Exports
///////////////////////////////////////
export const {
  loadAllNotes,
  addNote,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  archiveAllNotes,
  unarchiveAllNotes,
  deleteAllNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
