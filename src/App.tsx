import { AddNotes } from "./components/AddNotes";
import { Header } from "./components/Header";
import "./App.css";
import { NotesTable } from "./components/NotesTable";
import { NotesProps } from "./components/Notes.types";
import { useRef, useState } from "react";
import { SortNotes } from "./components/SortNotes";
import { SearchNotes } from "./components/SearchNotes";

function App() {
  const [userToEdit, setUserToEdit] = useState<null | NotesProps>(null);
  const [sortedNotes, setSortedNotes] = useState<null | NotesProps[]>(null);
  const [query, setQuery] = useState("");
  const formRef = useRef(null);
  return (
    <>
      <Header />
      <AddNotes
        userToEdit={userToEdit}
        setUserToEdit={setUserToEdit}
        formRef={formRef}
      />
      <SortNotes setSortedNotes={setSortedNotes} />
      <SearchNotes query={query} setQuery={setQuery} />
      <NotesTable
        setUserToEdit={setUserToEdit}
        userToEdit={userToEdit}
        sortedNotes={sortedNotes}
        query={query}
        formRef={formRef}
      />
    </>
  );
}

export default App;
