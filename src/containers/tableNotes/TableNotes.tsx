import React from "react";
import { TableHeader } from "../../components/tableHeader/TableHeader";
import { TableRow } from "../../components/tableRow/TableRow";
import { Note, Category, TableType } from "../../utilities/fetchingData";

interface TableNotesProps {
  notes: Note[];
  categories: Category[];
  type: TableType;
}

export const TableNotes = ({ notes, categories, type }: TableNotesProps) => {
  if (notes.length === 0 || categories.length === 0) return <div>No data</div>;
  else {
    let notesToShow: JSX.Element[] | [] = [];
    let tableId: string = "";
    let tbodyId: string = "";

    if (type === TableType.Active) {
      notesToShow = notes
        .filter((n) => !n.isArchived)
        .map((note) => {
          const category = categories.filter(
            (c) => c.id === Number(note.category)
          )[0];
          return (
            <TableRow
              note={note}
              category={category}
              type={type}
              key={note.id}
            />
          );
        });
      tableId = "activeNotes";
      tbodyId = "activeNotesBody";
    } else if (type === TableType.Archive) {
      notesToShow = notes
        .filter((n) => n.isArchived)
        .map((note) => {
          const category = categories.filter(
            (c) => c.id === Number(note.category)
          )[0];
          return (
            <TableRow
              note={note}
              category={category}
              type={type}
              key={note.id}
            />
          );
        });
      tableId = "archivedNotes";
      tbodyId = "archivedNotesBody";
    }
    return (
      <table id={tableId}>
        <TableHeader type={type} />
        <tbody id={tbodyId}>{notesToShow}</tbody>
      </table>
    );
  }
};
