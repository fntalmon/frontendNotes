import React from "react";
import { ThemeProvider, Container, CssBaseline } from "@mui/material";
import NoteContainer from "./components/NoteContainer"
import theme from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          bgcolor: "primary.azul",
          minHeight: "100vh", // Asegúrate de que el contenedor tenga al menos la altura de la pantalla
          margin: 0,
          padding: 0,
        }}
        maxWidth={false}
      >
        <NoteContainer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
