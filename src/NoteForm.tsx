import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { INote, PartialINote } from "./App";
import { v4 as uuid } from "uuid";
import { PreviewNote } from "./Notes";

export default function NoteForm({
  notes,
  setNotes,
}: {
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
    setNotes([fullNote, ...notes]);
    setNote({ title: "", content: "" });
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          required
          maxLength={26}
          value={note.title}
          onChange={handleTitleChange}
        ></input>
        <textarea
          placeholder="Take a note..."
          required
          value={note.content}
          onChange={handleContentChange}
        ></textarea>
        <input type="submit" value="Add a note"></input>
      </form>

      {(note.title !== "" || note.content !== "") && (
        <>
          Preview: <PreviewNote note={note}></PreviewNote>{" "}
        </>
      )}
    </div>
  );
}
