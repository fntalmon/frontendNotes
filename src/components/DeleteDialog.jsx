import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteNote } from "../api/api";

export default function DeleteDialog({ open, handleClose, noteId, handleDeletion }) {


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title"  sx={{ bgcolor: "primary.azul", color: "primary.blanco" }}>
        {`Do you want to delete this note?`}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "primary.azul" }}>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            border: 2,
            bgcolor: "primary.azul",
            "&:hover": { bgcolor: "primary.azul", color: "white" },
          }}
          onClick={handleClose}
        >
          No
        </Button>
        <Button
          sx={{
            border: 2,
            bgcolor: "primary.azul",
            "&:hover": { bgcolor: "primary.azul", color: "white" },
          }}
          onClick={handleDeletion}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
