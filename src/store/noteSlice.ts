import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  nextId: number;
  notes: { id: number; title: string; body: string }[];
};
const initialState: stateType = {
  nextId: 1,
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.unshift({ id: state.nextId++, ...action.payload });
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      state.notes[index] = action.payload;
    },
  },
});

export default noteSlice.reducer;

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
