import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";

import { TableType } from "./utilities/fetchingData";

import "./App.css";

import { TableNotes } from "./containers/tableNotes/TableNotes";
import { loadNotes } from "./containers/tableNotes/notesSlice";
import { loadCategories } from "./containers/tableNotes/categoriesSlice";
import { CreateNote } from "./components/createNote/CreateNote";
import { selectMode, switchMode } from "./containers/tableNotes/modeSlice";
import {
  switchFormState,
  selectFormState,
} from "./components/createNote/createNoteSlice";

function App() {
  const dispatch = useAppDispatch();

  //  const [mode, setMode] = useState<string>("active");
  //const [formState, setFormState] = useState<FormState>({
  //   createMode: false,
  // });
  //const [notes, setNotes] = useState<Note[] | []>([]);
  //const [categories, setCategories] = useState<Category[] | []>([]);

  // const setter = async () => {
  //   const notes = await getNotes();
  //   setNotes(notes);
  //   const categories = await getCategories();
  //   setCategories(categories);
  // };

  useEffect(() => {
    dispatch(loadNotes());
    dispatch(loadCategories());
  }, [dispatch]);

  const mode = useSelector(selectMode);
  const formStateMode = useSelector(selectFormState);

  return (
    <div className="App">
      {mode === "active" ? (
        <div className="activeNotes">
          <h1>Active Notes</h1>
          <button
            className="toArchive"
            onClick={() => {
              dispatch(switchMode("archive"));
            }}
          >
            Show Archive
          </button>
          <TableNotes type={TableType.Active} />
          <button
            id="createNoteButton"
            onClick={() => dispatch(switchFormState(!formStateMode))}
          >
            {formStateMode ? "Close Form" : "Create Note"}
          </button>
          {formStateMode ? <CreateNote /> : ""}
          <h2>Summary</h2>
          <TableNotes type={TableType.Summary} />
        </div>
      ) : (
        <div className="archiveNotes">
          <h1>Archived Notes</h1>
          <button
            className="toActive"
            onClick={() => {
              dispatch(switchMode("active"));
            }}
          >
            Show Active Notes
          </button>
          <TableNotes type={TableType.Archive} />
        </div>
      )}
    </div>
  );
}

export default App;
