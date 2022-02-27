import { Link, NavigateFunction } from "react-router-dom";
import { INote, PartialINote } from "./App";
import Markdown from "marked-react";

export type NoteWithStates = {
  note: INote;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
};

function deleteNote({
  noteId,
  notes,
  setNotes,
}: {
  noteId: string;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}) {
  const newNotes = notes.filter((note) => noteId !== note.id);
  setNotes(newNotes);
}

function NoteDeleteButton({
  noteId,
  notes,
  setNotes,
  navigate,
}: {
  noteId: string;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  navigate?: NavigateFunction;
}) {
  const handleClick = () => {
    deleteNote({ noteId, notes, setNotes });
    if (navigate) {
      navigate("/");
    }
  };
  return (
    <button onClick={handleClick} className="delete">
      <span role="img" aria-label="delete">
        🗑️
      </span>
    </button>
  );
}

export function PreviewNote({ note }: { note: PartialINote }) {
  return (
    <div className="note">
      <h1 className="title">
        <button type="button" className="link-button">
          <h1>{note.title}</h1>
        </button>{" "}
      </h1>
      <NoteDeleteButton noteId={""} notes={[]} setNotes={() => {}} />
      <div className="content">
        <Markdown gfm value={note.content} />
      </div>
      <p className="date">{"A preview date"}</p>
      <p className="id">{"A preview id"}</p>
    </div>
  );
}

export function Note({
  note,
  notes,
  setNotes,
  navigate,
  wrap,
}: {
  note: INote;
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  navigate?: NavigateFunction;
  wrap?: boolean;
}) {
  const singleNoteEndpoint = `/note/${note.id}`;
  return (
    <div className={wrap ? "note wrap-content" : "note"}>
      <h1 className="title">
        <Link to={singleNoteEndpoint}>{note.title}</Link>
      </h1>
      <NoteDeleteButton
        noteId={note.id}
        notes={notes}
        setNotes={setNotes}
        navigate={navigate}
      />
      <div className="content">
        <Markdown gfm value={note.content} />
      </div>
      <p className="date">{note.date.toLocaleString()}</p>
      <p className="id">{note.id}</p>
    </div>
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
    <div className="notes-container">
      {notes.map((note) => Note({ note, notes, setNotes, wrap: true }))}
    </div>
  );
}
