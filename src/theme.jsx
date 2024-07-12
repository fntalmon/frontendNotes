import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      azul: "#405D72",
      gris: "#758694",
      rosa: "#F7E7DC",
      blanco:"#FFF8F3"
    },
    secondary: {
      main: "#FFFFFF",
      dark: "#000000",
    },
    buttons: {
       green: "#008000",
       gray: "#AAAAAA",
       red: "#C30010",
       lightBlue: "#1E868C"
    }
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;