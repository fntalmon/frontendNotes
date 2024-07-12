import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Container } from "@mui/system";
import Tag from "./Tag";
import { getTags, createNote} from "../api/api";


export default function CreateDialog({ open, handleClose, handleCreation }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getTags().then((fetchedTags) => {
      const updatedTags = fetchedTags.map((tag) => ({
        ...tag,
        selected: false,
      }));
      setTags(updatedTags);
    });
  }, []);


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

    const note = {
      title: title,
      content: content,
      tags: result,
      active: true,
    }

    try{
      //const result = await createNote(note);
      handleCreation(note);
      setTitle("");
      setContent("");
    }
 
    catch(error){
      console.log("error")
    }
  }

  const handleCancelClick = () => {
    setTitle("");
    setContent("");
    setTags((prevTags) => prevTags.map((tag) => ({ ...tag, selected: false })));
    handleClose();
  };
  function clearAndClose() {
    setTags((prevTags) => prevTags.map((tag) => ({ ...tag, selected: false })));
    setTitle("");
    setContent("");
    handleClose();
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={clearAndClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle sx={{ bgcolor: "primary.azul", color: "primary.blanco" }}>
          Create
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
            onClick={handleCancelClick}
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
            onClick={prepareObject}
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
