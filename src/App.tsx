import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "./store";

import {
  getNotes,
  getCategories,
  Note,
  Category,
  TableType,
  FormState,
} from "./utilities/fetchingData";

import "./App.css";

import { TableNotes } from "./containers/tableNotes/TableNotes";
import { loadNotes, selectAllNotes } from "./containers/tableNotes/notesSlice";
import {
  selectAllCategories,
  loadCategories,
} from "./containers/tableNotes/categoriesSlice";
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
  }, []);

  const mode = useSelector(selectMode);
  const notes = useSelector(selectAllNotes);
  console.log(`notes: ${notes}`);
  const categories = useSelector(selectAllCategories);
  console.log(`categories: ${categories}`);
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
          <TableNotes
            notes={notes}
            categories={categories}
            type={TableType.Active}
            // setFormState={setFormState}
          />
          <button
            id="createNoteButton"
            onClick={() => dispatch(switchFormState(!formStateMode))}
          >
            {formStateMode ? "Close Form" : "Create Note"}
          </button>
          {formStateMode ? (
            <CreateNote
              // noteToEdit={
              //   notes.filter(
              //     (n) => Number(n.id) === Number(formState.noteId)
              //   )[0]
              // }
              categories={categories}
            />
          ) : (
            ""
          )}
          <h2>Summary</h2>
          <TableNotes
            notes={notes}
            categories={categories}
            type={TableType.Summary}
          />
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
          <TableNotes
            notes={notes}
            categories={categories}
            type={TableType.Archive}
          />
        </div>
      )}
    </div>
  );
}

export default App;
