import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Pagination,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { noteSelector } from "../store/noteSelectors";
import { NotesAction } from "./NotesAction";
import { NotesProps } from "./Notes.types";
import { useEffect, useState } from "react";

type NotesTableProps = {
  userToEdit: NotesProps | null;
  setUserToEdit: React.Dispatch<React.SetStateAction<NotesProps | null>>;
  sortedNotes: NotesProps[] | null;
  query: string;
  formRef: React.RefObject<HTMLFormElement>;
};

export const NotesTable = ({
  userToEdit,
  setUserToEdit,
  sortedNotes,
  query,
  formRef,
}: NotesTableProps) => {
  const notes = useSelector(noteSelector);
  const sortNotes = sortedNotes ? [...sortedNotes] : [...notes];

  const searchNotes = [...sortNotes].filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.body.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  const [page, setPage] = useState(2);
  const [rowsPerPage] = useState(2);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const indexOfLastRow: number = page * rowsPerPage;
  const indexOfFirstRow: number = indexOfLastRow - rowsPerPage;
  const currentNotes = searchNotes.slice(indexOfFirstRow, indexOfLastRow);
  const onEdit = (id: number) => {
    const objectToEdit = notes.find((note) => note.id === id);
    objectToEdit ? setUserToEdit(objectToEdit) : setUserToEdit(null);
  };
  return (
    <Box
      component={Paper}
      sx={{ margin: 2, mt: 0, maxWidth: "96%", p: 2, boxSizing: "border-box" }}
    >
      <TableContainer
        component={Paper}
        sx={{ margin: 2, mt: 0, maxWidth: "96%" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                backgroundColor: "#e3f2fd",
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>BODY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentNotes.map((note) => (
              <TableRow
                key={note.id}
                style={{
                  backgroundColor: note.id % 2 === 0 ? "lightgray" : "",
                }}
              >
                <TableCell>{note.id}</TableCell>
                <TableCell>{note.title}</TableCell>
                <TableCell>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {note.body}
                    <NotesAction
                      formRef={formRef}
                      id={note.id}
                      onEdit={onEdit}
                      userToEdit={userToEdit}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(searchNotes.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};
