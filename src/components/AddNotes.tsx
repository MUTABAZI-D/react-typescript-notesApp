import { Stack, TextField, Box, Typography, Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../store/noteSlice";
import { NotesProps } from "./Notes.types";
import { useEffect } from "react";

type AddNotesProps = {
  userToEdit: NotesProps | null;
  setUserToEdit: React.Dispatch<React.SetStateAction<NotesProps | null>>;
  formRef: React.RefObject<HTMLFormElement>;
};

export const AddNotes = ({
  userToEdit,
  setUserToEdit,
  formRef,
}: AddNotesProps) => {
  const defaultValues = {
    title: "",
    body: "",
  };
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleCancel = () => {
    reset(defaultValues);
    setUserToEdit(null);
  };
  useEffect(() => {
    if (userToEdit) {
      reset(userToEdit);
    }
  }, [userToEdit, reset]);

  const onsubmit = (data: { title: string; body: string }) => {
    if (userToEdit) {
      dispatch(updateNote(data));
      setUserToEdit(null);
    } else {
      dispatch(addNote(data));
    }
    reset(defaultValues);
  };
  return (
    <Box
      ref={formRef}
      sx={{
        width: { xs: "85%", sm: "80%", md: "60%", lg: "50%" },
        paddingTop: "80px",
        marginLeft: "50px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "underline",
          mb: 1,
        }}
        color={"secondary"}
      >
        {userToEdit ? "Edit Notes" : "Add Notes"}
      </Typography>
      <Stack spacing={2} direction="column">
        <TextField
          variant="outlined"
          label="Title"
          type="text"
          {...register("title", { required: "Title is required." })}
          error={!!errors.title}
          helperText={errors.title?.message as string}
          fullWidth
        />
        <TextField
          label="Body"
          type="text"
          {...register("body", { required: "Body is required." })}
          error={!!errors.body}
          helperText={errors.body?.message as string}
          multiline
          rows={4}
          fullWidth
        />
      </Stack>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ marginTop: 1, marginBottom: 3 }}
      >
        <Button variant="contained" onClick={handleSubmit(onsubmit)}>
          {userToEdit ? "Edit" : "Add"}
        </Button>
        <Button variant="contained" onClick={handleCancel} color="warning">
          cancel
        </Button>
      </Stack>
    </Box>
  );
};
