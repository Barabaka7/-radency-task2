import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";

import { FormData } from "../../utilities/fetchingData";
import { selectAllCategories } from "../../containers/tableNotes/categoriesSlice";
import {
  selectAllNotes,
  updateNote,
  addNote,
} from "../../containers/tableNotes/notesSlice";
import {
  switchFormState,
  selectFormState,
  selectFormNoteId,
} from "./createNoteSlice";

export const CreateNote = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({ activateButton: true });

  const noteIdToEdit = useSelector(selectFormNoteId);
  let noteToEdit = useSelector(selectAllNotes).filter(
    (n) => n.id === noteIdToEdit
  )[0];

  const categories = useSelector(selectAllCategories);
  const formStateMode = useSelector(selectFormState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let category = categories.find(
      (c) => c.categoryName === formData.category
    )?.id;

    if (noteToEdit && formData.name && formData.category && category) {
      const updatedNote = {
        id: noteToEdit.id,
        noteName: formData.name,
        category: category,
        noteContent: formData.text,
      };
      dispatch(updateNote(updatedNote));
    } else if (!noteToEdit && formData.name && formData.category && category) {
      const newNote = {
        noteName: formData.name,
        creationDate: String(new Date()),
        category: category,
        noteContent: formData.text,
        isArchived: false,
      };
      dispatch(addNote(newNote));
    }

    dispatch(switchFormState(!formStateMode));
  };

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setFormData((prev: FormData) => {
        return { ...prev, name: e.target.value, activateButton: false };
      });
    } else {
      setFormData((prev: FormData) => {
        return { ...prev, name: "", activateButton: true };
      });
    }
  };

  const handleInputCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev: FormData) => {
      return { ...prev, category: e.target.value };
    });
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev: FormData) => {
      return { ...prev, text: e.target.value };
    });
  };

  let options: JSX.Element[] = [];
  let noteText,
    noteName,
    selectedOption: string = "";

  options = categories.map((cat) => {
    let name = cat.categoryName;
    return (
      <option key={cat.id} value={name}>
        {name}
      </option>
    );
  });

  useEffect(() => {
    if (noteToEdit) {
      selectedOption = categories.filter(
        (c) => Number(c.id) === Number(noteToEdit.category)
      )[0].categoryName;
      noteText = noteToEdit.noteContent;
      noteName = noteToEdit.noteName;
      setFormData({
        name: noteName,
        category: selectedOption,
        text: noteText,
        activateButton: false,
      });
    }
  }, [noteToEdit]);

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
          value={formData.name}
          onChange={handleInputNameChange}
        />

        <br />
        <label htmlFor="category">Select Category</label>
        <br />
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputCategoryChange}
        >
          {options}
        </select>
        <textarea
          id="newNoteText"
          name="newNoteText"
          placeholder="Add Note Text Here"
          cols={30}
          rows={3}
          value={formData.text}
          onChange={handleInputTextChange}
        ></textarea>
        <br />
        <input
          type="submit"
          value="Submit"
          id="submitButton"
          disabled={formData.activateButton}
        />
      </form>
    </div>
  );
};
