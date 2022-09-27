import { configureStore } from "@reduxjs/toolkit";

import modeSliceReducer from "./containers/tableNotes/modeSlice";
import notesReducer from "./containers/tableNotes/notesSlice";
import cateriesReducer from "./containers/tableNotes/categoriesSlice";

const store = configureStore({
  reducer: {
    mode: modeSliceReducer,
    notes: notesReducer,
    categories: cateriesReducer,
  },
});

export default store;
