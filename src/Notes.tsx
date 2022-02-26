import { NavigateFunction } from "react-router-dom";
import { INote } from "./App";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Link,
  ListItem,
  List,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export type NoteWithStates = {
  note: INote;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
};

function deleteNote({ note: toDelete, notes, setNotes }: NoteWithStates) {
  const newNotes = notes.filter((note) => toDelete.id !== note.id);
  setNotes(newNotes);
}

export function Note({
  note,
  notes,
  setNotes,
  navigate,
}: NoteWithStates & {
  navigate?: NavigateFunction;
}) {
  const singleNoteEndpoint = `/note/${note.id}`;
  return (
    <Paper>
      <Stack alignItems="center">
        <Link href={singleNoteEndpoint}>
          <h1>{note.title}</h1>
        </Link>

        <IconButton
          onClick={() => {
            deleteNote({ note, notes, setNotes });
            if (navigate) {
              navigate("/");
            }
          }}
          color="error"
        >
          <Delete />
        </IconButton>
        <Paper> {note.content} </Paper>

        {note.date.toLocaleString() + " " + note.id}
      </Stack>
    </Paper>
  );
}

export default function Notes({
  notes,
  setNotes,
}: {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}) {
  return (
    <Stack spacing={2}>
      {notes.map((note) => Note({ note, notes, setNotes }))}
    </Stack>
  );
}
