import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { LightTheme, FontsColors } from "../themes";

export const AppThemeProvider: React.FC = ({ children }) => {

  return (
      <ThemeProvider theme={LightTheme}>
        <Box
          width="100vw"
          height="100vh"
        >
          {children}
        </Box>
      </ThemeProvider>
  );
};
