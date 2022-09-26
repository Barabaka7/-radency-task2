import React, { useState, useEffect } from "react";
import {
  getNotes,
  getCategories,
  Note,
  Category,
  TableType,
  FormState,
} from "./utilities/fetchingData";

//import { Provider } from "react-redux";
//import store from '../store';
import { TableNotes } from "./containers/tableNotes/TableNotes";

import "./App.css";
import { CreateNote } from "./components/createNote/CreateNote";

function App() {
  const [mode, setMode] = useState<string>("active");
  const [formState, setFormState] = useState<FormState>({
    createMode: false,
  });
  const [notes, setNotes] = useState<Note[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);

  const setter = async () => {
    const notes = await getNotes();
    setNotes(notes);
    const categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    setter();
  }, []);

  return (
    <div className="App">
      {/* <Provider store={store}> */}
      {mode === "active" ? (
        <div className="activeNotes">
          <h1>Active Notes</h1>
          <button
            className="toArchive"
            onClick={() => {
              setMode("archive");
            }}
          >
            Show Archive
          </button>
          <TableNotes
            notes={notes}
            categories={categories}
            type={TableType.Active}
            setFormState={setFormState}
          />
          <button
            id="createNoteButton"
            onClick={() => setFormState({ createMode: !formState.createMode })}
          >
            {formState.createMode ? "Close Form" : "Create Note"}
          </button>
          {formState.createMode ? (
            <CreateNote
              noteToEdit={
                notes.filter(
                  (n) => Number(n.id) === Number(formState.noteId)
                )[0]
              }
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
              setMode("active");
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
      {/* </Provider> */}
    </div>
  );
}

export default App;
