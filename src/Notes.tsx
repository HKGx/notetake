import { INote } from "./App";

export function Note(props: INote) {
  const singleNoteEndpoint = `/note/${props.id}`;
  return (
    <li key={props.id}>
      <div>
        <a href={singleNoteEndpoint}>
          <h1>{props.title}</h1>{" "}
        </a>
        <p> {props.id} </p>
        <p> {props.content}</p>
      </div>
    </li>
  );
}

export default function Notes({ notes }: { notes: INote[] }) {
  return <div>{notes.map(Note)}</div>;
}
