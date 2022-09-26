import { Note, Category, TableType } from "../../utilities/fetchingData";
import { findDates } from "../../utilities/parsingDates";

interface TableRowProps {
  note: Note;
  category: Category;
  type: TableType;
}

export const TableRow = ({ note, category, type }: TableRowProps) => {
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
      return <span></span>;
  }
};
