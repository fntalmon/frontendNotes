import React, { useState } from "react";
import { Box, Grid, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Edit, Delete, Archive, Unarchive } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function Note({ note, onEditClick, onDeleteClick, onActiveClick, onArchiveClick }) {
  const [active, setActive] = useState(note.active);

  function modify() {
    active? onArchiveClick(note) : onActiveClick(note);
    setActive(!active);
  }

  return (
    <Box
      sx={{
        width: 300,
        height: 150,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "primary.gris",
        borderRadius: 2,
        bgcolor: "primary.blanco",
        "&:hover": {
          bgcolor: "primary.rosa",
        },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        sx={{ height: "100%" }}
      >
        <Grid item xs={8} padding={2}>
          <Box sx={{ height: "20%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.azul" }}
            >
              {note.title}
            </Typography>
          </Box>
          <Box sx={{ height: "80%" }}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ color: "primary.gris" }}
            >
              {note.content}
            </Typography>
            
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <ButtonGroup sx={{ marginRight: 2 }}>
                <IconButton
                  sx={{ color: "buttons.lightBlue" }}
                  onClick={() => onEditClick(note)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  sx={{ color: "buttons.red" }}
                  onClick={() => onDeleteClick(note.noteId)}
                >
                  <Delete />
                </IconButton>
                <IconButton onClick={modify} sx={{ color: "buttons.gray" }}>
                  {note.active ? <Unarchive /> : <Archive />}
                </IconButton>
              </ButtonGroup>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
