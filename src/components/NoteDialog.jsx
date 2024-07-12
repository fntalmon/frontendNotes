import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Container } from "@mui/system";
import Tag from "./Tag";
import { getTags } from "../api/api";

export default function NoteDialog({ open, handleClose, handleUpdating, note }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }

    if (open && note) {
      getTags().then((fetchedTags) => {
        const noteTagIds = note.tags.map((tag) => tag.tagId);
        const updatedTags = fetchedTags.map((tag) => ({
          ...tag,
          selected: noteTagIds.includes(tag.tagId),
        }));
        setTags(updatedTags);
      });
    }
  }, [note, open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const handleTagSelect = (tag, isSelected) => {
    setTags((prevTags) =>
      prevTags.map((t) =>
        t.tagId === tag.tagId ? { ...t, selected: isSelected } : t
      )
    );
  };

  async function prepareObject  () {
    const filteredTags = tags.filter((tag) => tag.selected);
    const result = filteredTags.map(({ selected, ...rest }) => rest);

    const updatedNote = {
      noteId: note.noteId,
      title: title,
      content: content,
      tags: result,
      active: note.active,
    }

    try{
      handleUpdating(updatedNote)
    }
 
    catch(error){
      console.log("error")
    }
  }


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle sx={{ bgcolor: "primary.azul", color: "primary.blanco" }}>
          Edit
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "primary.azul" }}>
          <TextField
            sx={{
              input: {
                color: "white",
              },
            }}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{
              textarea: {
                color: "white",
              },
            }}
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Content"
            fullWidth
            multiline
            minRows={5}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: "primary.azul" }}>
          <Container sx={{ width: "75%" }}>
            {tags.map((tag) => (
              <Tag
                key={tag.tagId}
                label={tag.content}
                initialSelected={tag.selected}
                onSelect={(isSelected) => handleTagSelect(tag, isSelected)}
              />
            ))}
          </Container>
          <Button
            onClick={handleClose}
            sx={{
              border: 2,
              bgcolor: "primary.azul",
              "&:hover": { bgcolor: "primary.azul", color: "white" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={prepareObject}//() => handleUpdating(note)}
            sx={{
              border: 2,
              bgcolor: "primary.azul",
              "&:hover": { bgcolor: "primary.azul", color: "white" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
