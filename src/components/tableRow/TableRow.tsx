import {
  Note,
  Category,
  TableType,
  FormState,
} from "../../utilities/fetchingData";
import { findDates } from "../../utilities/parsingDates";

interface TableRowProps {
  note: Note;
  category: Category;
  type: TableType;
  quantityActive?: number;
  quantityArchive?: number;
  setFormState?: (arg0: FormState) => void;
}

export const TableRow = ({
  note,
  category,
  type,
  quantityActive,
  quantityArchive,
  setFormState,
}: TableRowProps) => {
  const handleEditNoteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (setFormState) {
      //  console.log(event.currentTarget.id);
      setFormState({
        createMode: true,
        noteId: Number(event.currentTarget.id),
      });
    }
  };

  const findedDates = findDates(note.noteContent);

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
          <td>${note.noteName}</td>
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
