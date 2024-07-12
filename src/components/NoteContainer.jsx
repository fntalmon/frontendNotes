import React, { useEffect, useState } from "react";
import Note from "./Note";
import DeleteDialog from "./DeleteDialog";
import NoteDialog from "./NoteDialog";
import CreateDialog from "./CreateDialog";
import { deleteNote, getNotes, createNote, toggleActive, updateNote } from "../api/api";
import { Grid, Button, Box, Snackbar, Alert, Typography, colors } from "@mui/material";

function NoteContainer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [archivadas, setArchivadas] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const fetchedNotes = await getNotes();
    const updatedNotes = fetchedNotes.map((note) => ({
      ...note,
    }));
    const updateActiveNotes = updatedNotes.filter((note) => note.active);
    const updateArchivedNotes = updatedNotes.filter((note) => !note.active);
    setNotes(updatedNotes);
    setActiveNotes(updateActiveNotes);
    setArchivedNotes(updateArchivedNotes);
  };

  const handleDeleteClick = (noteId) => {
    setSelectedNoteId(noteId);
    setDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDialogOpen(false);
    setSelectedNoteId(null);
  };

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedNoteId(null);
  };

  const handleArchivadasClick = () => {
    setArchivadas(!archivadas);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };

  const handleNoteDeletion = async () => {
    const result = await deleteNote(selectedNoteId);
    if (result) {
      const newNotes = notes.filter((note) => note.noteId !== selectedNoteId);
      setNotes(newNotes);
      updateFilteredNotes(newNotes);
      showSnackbar("Note deleted succesfully!", "success");
    }
    handleDeleteDialogClose();
  };

  const handleNoteAdding = async (note) => {
    const newNote = await createNote(note);
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    updateFilteredNotes(newNotes);
    showSnackbar("Note added succesfully!", "success");
  };

  const handleNoteUpdating = async (updatedNote) => {
    await updateNote(updatedNote);
    const newNotes = notes.map((note) =>
      note.noteId === updatedNote.noteId ? updatedNote : note
    );
    setNotes(newNotes);
    updateFilteredNotes(newNotes);
    showSnackbar("Note updated succesfully!", "success");
  };

  const updateFilteredNotes = (updatedNotes) => {
    const updateActiveNotes = updatedNotes.filter((note) => note.active);
    const updateArchivedNotes = updatedNotes.filter((note) => !note.active);
    setActiveNotes(updateActiveNotes);
    setArchivedNotes(updateArchivedNotes);
  };

  const setNoteActive = async (modifiedNote) => {
    const result = await toggleActive(modifiedNote.noteId);
    if (result) {
      const newNotes = notes.map((note) =>
        note.noteId === modifiedNote.noteId ? { ...note, active: true } : note
      );
      setNotes(newNotes);
      updateFilteredNotes(newNotes);
    }
    showSnackbar("Note actived", "success");
  };

  const setNoteArchived = async (modifiedNote) => {
    const result = await toggleActive(modifiedNote.noteId);
    if (result) {
      const newNotes = notes.map((note) =>
        note.noteId === modifiedNote.noteId ? { ...note, active: false } : note
      );
      setNotes(newNotes);
      updateFilteredNotes(newNotes);
    }
    showSnackbar("Note archived", "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ paddingBlock: 2 }}>
        {!archivadas && (
          <Button sx={{ marginLeft: 2 }} variant="outlined" onClick={handleCreateDialogOpen}>
            Add new note
          </Button>
        )}
        <Button sx={{ marginLeft: 2 }} variant="outlined" onClick={handleArchivadasClick}>
          {archivadas ? "Go back" : "See archived"}
        </Button>
      </Box>
      <Typography  color={'primary.blanco'} variant="h3" gutterBottom>{archivadas ? "My archived notes" : "My active notes"}</Typography>
      <Grid container spacing={2}>
        {archivadas
          ? archivedNotes.map((note) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={note.noteId}>
                <Note
                  note={note}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  onActiveClick={setNoteActive}
                  onArchiveClick={setNoteArchived}
                />
              </Grid>
            ))
          : activeNotes.map((note) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={note.noteId}>
                <Note
                  note={note}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                  onActiveClick={setNoteActive}
                  onArchiveClick={setNoteArchived}
                />
              </Grid>
            ))}
      </Grid>

      <DeleteDialog
        open={dialogOpen}
        handleClose={handleDeleteDialogClose}
        handleDeletion={handleNoteDeletion}
        noteId={selectedNoteId}
      />
      <NoteDialog
        open={editDialogOpen}
        handleClose={handleEditDialogClose}
        handleUpdating={handleNoteUpdating}
        note={selectedNote}
      />
      <CreateDialog
        open={createDialogOpen}
        handleClose={handleCreateDialogClose}
        handleCreation={handleNoteAdding}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NoteContainer;
