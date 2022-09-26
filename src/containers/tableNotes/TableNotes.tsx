import React from "react";
import { TableHeader } from "../../components/tableHeader/TableHeader";
import { TableRow } from "../../components/tableRow/TableRow";
import {
  Note,
  Category,
  TableType,
  FormState,
} from "../../utilities/fetchingData";

interface TableNotesProps {
  notes: Note[];
  categories: Category[];
  type: TableType;
  setFormState?: (arg0: FormState) => void;
}

export const TableNotes = ({
  notes,
  categories,
  type,
  setFormState,
}: TableNotesProps) => {
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
              setFormState={setFormState}
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
    } else {
      notesToShow = categories.map((category) => {
        const quantityActive = notes.filter(
          (note) =>
            Number(note.category) === Number(category.id) && !note.isArchived
        ).length;
        const quantityArchive = notes.filter(
          (note) =>
            Number(note.category) === Number(category.id) && note.isArchived
        ).length;

        return (
          <TableRow
            quantityActive={quantityActive}
            quantityArchive={quantityArchive}
            category={category}
            type={type}
            key={category.id}
            note={notes[0]}
          />
        );
      });
      tableId = "statistics";
      tbodyId = "statisticsBody";
    }

    return (
      <table id={tableId}>
        <TableHeader type={type} />
        <tbody id={tbodyId}>{notesToShow}</tbody>
      </table>
    );
  }
};
