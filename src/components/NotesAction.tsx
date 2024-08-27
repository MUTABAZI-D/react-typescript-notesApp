import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { deleteNote } from "../store/noteSlice";
import { NotesProps } from "./Notes.types";

const options = ["Edit", "Delete"];

type NotesActionProps = {
  id: number;
  onEdit: (id: number) => void;
  userToEdit: NotesProps | null;
};

export const NotesAction = ({ id, onEdit, userToEdit }: NotesActionProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    onEdit(id);
    handleClose();
  };

  const dispatch: AppDispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(id));
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={!!userToEdit}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={option === "Delete" ? handleDelete : handleEdit}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
