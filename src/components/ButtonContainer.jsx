import React from "react";
import { Box, Button } from "@mui/material";
import CreateDialog from "./CreateDialog";
import { useState } from "react";

function ButtonContainer({ archivadas, setArchivadas }) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleClick = () => {
    setArchivadas(!archivadas); // Actualiza el estado al hacer clic
  };

  function handleDialogClose() {
    setCreateDialogOpen(false);
  }

  function handleOpenClick() {
    setCreateDialogOpen(true);
  }


  return (
    <Box sx={{ paddingBlock: 2 }}>
      <Button variant="outlined" onClick={handleOpenClick}>
        Crear
      </Button>
      <Button variant="outlined" onClick={handleClick}>
        {archivadas ? "Archivadas" : "Volver"}
      </Button>
      <CreateDialog open={createDialogOpen} handleClose={handleDialogClose} />
    </Box>
  );
}

export default ButtonContainer;
