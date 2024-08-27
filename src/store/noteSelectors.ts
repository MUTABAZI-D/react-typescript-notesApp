import { RootState } from "./store";

export const noteSelector = (state: RootState) => state.notesReducer.notes;
