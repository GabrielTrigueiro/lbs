import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      //cores de botões
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#ffffff",
    },
    secondary: {
      //cores de botões
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    background: {
      default: "#303134", //Funda da pagina
      paper: "#202124", //cards
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
