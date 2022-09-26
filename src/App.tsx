import React, { useState, useEffect } from "react";
import {
  getNotes,
  getCategories,
  Note,
  Category,
  TableType,
} from "./utilities/fetchingData";

//import { Provider } from "react-redux";
//import store from '../store';
import { TableNotes } from "./containers/tableNotes/TableNotes";

import "./App.css";

function App() {
  const [mode, setMode] = useState<string>("active");

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
          />
          <button id="createNoteButton">Create Note</button>
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
