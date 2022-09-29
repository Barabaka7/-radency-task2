import { Note } from "./fetchingData";
import { selectAllNotes } from "../containers/tableNotes/notesSlice";
import { useSelector } from "react-redux";

export const useGenerateNewIdForMyTask2 = () => {
  const currentStateNotes: Note[] = useSelector(selectAllNotes);

  let newId: number = 0;
  const sortedIds = currentStateNotes.map((n) => n.id).sort((a, b) => b - a);
  for (let i = 0; i < sortedIds.length; i++) {
    if (sortedIds[i + 1] && sortedIds[i + 1] - sortedIds[i] > 1) {
      newId = sortedIds[i]++;
      break;
    } else if (!sortedIds[i + 1]) {
      newId = sortedIds[i]++;
    }
  }
  return newId;
};
