import * as React from "react";
import {
  Stack,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { NotesProps } from "./Notes.types";
import { useSelector } from "react-redux";
import { noteSelector } from "../store/noteSelectors";

type SortNotesProps = {
  setSortedNotes: React.Dispatch<React.SetStateAction<NotesProps[] | null>>;
};

export const SortNotes = ({ setSortedNotes }: SortNotesProps) => {
  const [sort, setSort] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const notes = useSelector(noteSelector);

  React.useEffect(() => {
    if (sort === "a-z") {
      setSortedNotes([...notes].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sort === "z-a") {
      setSortedNotes([...notes].sort((a, b) => b.title.localeCompare(a.title)));
    } else if (sort === "id-ascend") {
      setSortedNotes([...notes].sort((a, b) => a.id - b.id));
    } else if (sort === "id-descend") {
      setSortedNotes([...notes].sort((a, b) => b.id - a.id));
    }
  }, [sort, notes]);

  return (
    <Stack
      m={2}
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Typography
        variant="h5"
        component={"h1"}
        sx={{
          fontWeight: "bold",
          textDecoration: "underline",
        }}
        color={"secondary"}
      >
        Sort Notes:
      </Typography>
      <Box sx={{ width: "150px", marginLeft: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value={"a-z"}>Title A-Z</MenuItem>
            <MenuItem value={"z-a"}>Title Z-A</MenuItem>
            <MenuItem value={"id-ascend"}>ID Ascending</MenuItem>
            <MenuItem value={"id-descend"}>ID Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};
