import { Note, Category, TableType } from "../../utilities/fetchingData";
import { findDates } from "../../utilities/parsingDates";
import { useAppDispatch } from "../../store";
import { setNoteToEditId } from "../createNote/createNoteSlice";
import {
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../../containers/tableNotes/notesSlice";

interface TableRowProps {
  note: Note;
  category: Category;
  type: TableType;
  quantityActive?: number;
  quantityArchive?: number;
}

export const TableRow = ({
  note,
  category,
  type,
  quantityActive,
  quantityArchive,
}: TableRowProps) => {
  const dispatch = useAppDispatch();

  const handleEditNoteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      setNoteToEditId({
        createMode: true,
        noteId: Number(event.currentTarget.id),
      })
    );
  };

  const handleArchiveNoteClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(archiveNote(Number(event.currentTarget.id)));
  };

  const handleUnarchiveNoteClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(unarchiveNote(Number(event.currentTarget.id)));
  };

  const handleDeleteNoteClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(deleteNote(Number(event.currentTarget.id)));
  };

  let findedDates: string[] | null = [];

  if (note.noteContent) {
    findedDates = findDates(note.noteContent);
  }
  switch (type) {
    case TableType.Active:
      return (
        <tr className="regularRow">
          <td>
            <img
              className="categoryIcon"
              src={category.categoryIcon}
              alt="Category Icon"
            />
          </td>
          <td>{note.noteName}</td>
          <td>
            {new Date(note.creationDate).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </td>
          <td>{category.categoryName}</td>
          <td>{note.noteContent}</td>
          <td>{findedDates ? findedDates.join(", ") : ""}</td>
          <td>
            <button
              className="tableButton"
              type="button"
              name="editNote"
              title="Edit this Note"
              key={note.id}
              id={String(note.id)}
              onClick={handleEditNoteClick}
            >
              <img
                className="tableHeaderIcon"
                src="img/edit.png"
                alt="Edit Note"
              />
            </button>
          </td>
          <td>
            <button
              className="tableButton"
              type="button"
              name="archiveNote"
              title="Archive this Note"
              key={note.id}
              id={String(note.id)}
              onClick={handleArchiveNoteClick}
            >
              <img
                className="tableHeaderIcon"
                src="img/archive.png"
                alt="Archive Note"
              />
            </button>
          </td>
          <td>
            <button
              className="tableButton"
              type="button"
              name="deleteNote"
              title="Delete this Note"
              key={note.id}
              id={String(note.id)}
              onClick={handleDeleteNoteClick}
            >
              <img
                className="tableHeaderIcon"
                src="/img/delete.png"
                alt="Delete Note"
              />
            </button>
          </td>
        </tr>
      );

    case TableType.Archive:
      return (
        <tr className="regularRow">
          <td>
            <img
              className="categoryIcon"
              src={category.categoryIcon}
              alt="Category Icon"
            />
          </td>
          <td>{note.noteName}</td>
          <td>
            {new Date(note.creationDate).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </td>
          <td>{category.categoryName}</td>
          <td>{note.noteContent}</td>
          <td>{findedDates ? findedDates.join(", ") : ""}</td>
          <td>
            <button
              className="tableButton"
              type="button"
              name="unarchiveNote"
              title="Unarchive this Note"
              key={note.id}
              id={String(note.id)}
              onClick={handleUnarchiveNoteClick}
            >
              <img
                className="tableHeaderIcon"
                src="img/unarchive.png"
                alt="Unarchive Note"
              />
            </button>
          </td>
          <td>
            <button
              className="tableButton"
              type="button"
              name="deleteNote"
              title="Delete this Note"
              key={note.id}
              id={String(note.id)}
              onClick={handleDeleteNoteClick}
            >
              <img
                className="tableHeaderIcon"
                src="/img/delete.png"
                alt="Delete Note"
              />
            </button>
          </td>
        </tr>
      );

    case TableType.Summary:
      return (
        <tr className="regularRow">
          <td>
            <img
              className="categoryIcon"
              src={category.categoryIcon}
              alt="Category Icon"
            />
          </td>
          <td>{category.categoryName}</td>
          <td>{quantityActive}</td>
          <td>{quantityArchive}</td>
        </tr>
      );
  }
};
