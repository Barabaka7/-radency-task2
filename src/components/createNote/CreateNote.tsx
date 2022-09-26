import { Category, Note } from "../../utilities/fetchingData";

interface CreateNoteProps {
  noteToEdit?: Note;
  categories?: Category[];
}

export const CreateNote = ({ noteToEdit, categories }: CreateNoteProps) => {
  const handleSubmit = () => {};

  let options: JSX.Element[] = [];
  let noteText,
    noteName,
    selectedOption: string = "";

  if (categories) {
    options = categories.map((cat) => {
      let name = cat.categoryName;
      return (
        <option key={cat.id} value={name}>
          {name}
        </option>
      );
    });

    if (noteToEdit) {
      selectedOption = categories.filter(
        (c) => Number(c.id) === Number(noteToEdit.category)
      )[0].categoryName;
      noteText = noteToEdit.noteContent;
      noteName = noteToEdit.noteName;
    }
  }

  return (
    <div id="createNote">
      <h3 className="createNote">
        {noteToEdit ? "Edit Note" : "Create New Note"}
      </h3>
      <form onSubmit={handleSubmit} className="addNote" id="createNoteForm">
        <input
          type="text"
          id="newNoteName"
          name="newNoteName"
          placeholder="Add Note Name Here"
          value={noteName}
        />

        <br />
        <label htmlFor="category">Select Category</label>
        <br />
        <select
          id="category"
          name="category"
          value={selectedOption}
          onChange={(e) => {
            selectedOption = e.target.value;
          }}
        >
          {options}
        </select>
        <textarea
          id="newNoteText"
          name="newNoteText"
          placeholder="Add Note Text Here"
          cols={30}
          rows={3}
          value={noteText}
        ></textarea>
        <br />
        <input type="submit" value="Add Note" id="submitButton" disabled />
      </form>
    </div>
  );
};
