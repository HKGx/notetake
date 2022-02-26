import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import NoteForm from "./NoteForm";
import Notes, { Note } from "./Notes";

export interface INote {
  id: string;
  title: string;
  content: string;
}

export type PartialINote = Omit<INote, "id">;

function MainPage({
  notes,
  setNotes,
}: {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}) {
  return (
    <main>
      <NoteForm notes={notes} setNotes={setNotes}></NoteForm>
      <Notes notes={notes}></Notes>
    </main>
  );
}

function getNote(noteId: string, notes: INote[]) {
  return notes.find((note) => note.id === noteId);
}

function SingleNote({ notes }: { notes: INote[] }) {
  const params = useParams();
  const note = getNote(params.noteId!, notes);
  console.log(notes);
  console.log(params);
  console.log(note);
  if (!note) {
    return <div>Note not found. Go back!</div>;
  }
  return <Note content={note.content} id={note.id} title={note.title}></Note>;
}

function App() {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <header>
        <h1>Notetake</h1>
      </header>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} setNotes={setNotes} />}
        />
        <Route path="/note/:noteId" element={<SingleNote notes={notes} />} />
      </Routes>
      <footer>
        <p>
          {" "}
          Made with love by <a href="https://github.com/HKGx">hkg</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
