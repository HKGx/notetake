import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { INote, PartialINote } from "./App";
import { v4 as uuid } from "uuid";
import {
  Box,
  Container,
  IconButton,
  OutlinedInput,
  Paper,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";

export default function NoteForm(props: {
  notes: INote[];
  setNotes: Dispatch<SetStateAction<INote[]>>;
}) {
  const [note, setNote] = useState<PartialINote>({
    title: "",
    content: "",
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fullNote: INote = {
      ...note,
      date: new Date(),
      id: uuid(),
    };
    props.setNotes([fullNote, ...props.notes]);
    setNote({ title: "", content: "" });
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  return (
    <Paper sx={{ margin: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack alignItems="center" spacing={2}>
          <OutlinedInput
            placeholder="Title"
            required
            value={note.title}
            onChange={handleTitleChange}
          ></OutlinedInput>
          <OutlinedInput
            placeholder="Take a note..."
            required
            multiline
            value={note.content}
            onChange={handleContentChange}
          ></OutlinedInput>
          <IconButton type="submit">
            <Add />
          </IconButton>
        </Stack>
      </form>
    </Paper>
  );
}
