import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { uid } from "uid";
import { INote, PartialINote } from "./App";

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
      id: uid(),
    };
    props.setNotes([...props.notes, fullNote]);
    setNote({ title: "", content: "" });
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={note.title}
        placeholder="Title"
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Take a note..."
        value={note.content}
        onChange={handleContentChange}
      />
      <input type="submit" value="Add note" />
    </form>
  );
}
