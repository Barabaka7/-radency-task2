import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import modeSliceReducer from "./containers/tableNotes/modeSlice";
import notesReducer from "./containers/tableNotes/notesSlice";
import categoriesReducer from "./containers/tableNotes/categoriesSlice";
import formStateReducer from "./components/createNote/createNoteSlice";

const store = configureStore({
  reducer: {
    mode: modeSliceReducer,
    notes: notesReducer,
    categories: categoriesReducer,
    formState: formStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
