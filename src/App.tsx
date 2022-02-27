import React, { useEffect, useState } from "react";
import {
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import NoteForm from "./NoteForm";
import Notes, { Note } from "./Notes";
import "./App.css";
import { ReactComponent as ReactIcon } from "./react-icon.svg";
export interface INote {
  id: string;
  date: Date;
  title: string;
  content: string;
}

export type PartialINote = Omit<INote, "id" | "date">;

function MainPage({
  notes,
  setNotes,
}: {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}) {
  return (
    <main>
      <NoteForm notes={notes} setNotes={setNotes} />
      <hr></hr>
      <Notes notes={notes} setNotes={setNotes} />
    </main>
  );
}

function getNote(noteId: string, notes: INote[]) {
  return notes.find((note) => note.id === noteId);
}

function SingleNote({
  notes,
  setNotes,
  navigate,
}: {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  navigate: NavigateFunction;
}) {
  const params = useParams();
  const note = getNote(params.noteId!, notes);
  if (!note) {
    return <div>Note not found. Go back!</div>;
  }
  return (
    <main>
      <button onClick={() => navigate("/")}>Go home 🏠</button>
      <Note
        note={note}
        notes={notes}
        setNotes={setNotes}
        navigate={navigate}
      ></Note>
    </main>
  );
}

function App() {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    const notes: {
      id: string;
      date: string;
      title: string;
      content: string;
    }[] = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(notes.map((note) => ({ ...note, date: new Date(note.date) })));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const navigate = useNavigate();

  return (
    <>
      <header>
        <h1>Notetake</h1>
      </header>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/note/:noteId"
          element={
            <SingleNote notes={notes} setNotes={setNotes} navigate={navigate} />
          }
        />
      </Routes>
      <footer>
        Made with <ReactIcon className="react-icon" /> by {""}
        <a href="https://github.com/HKGx">hkg</a>
      </footer>
    </>
  );
}

export default App;
