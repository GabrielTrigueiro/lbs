import {
  Icon,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";
import Add from "@mui/icons-material/Add"

interface ILayoutBasePageProps {
  titulo: string;
  barraDeFerramentas?: ReactNode;
  nameButton: string;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
  titulo,
  nameButton,
  barraDeFerramentas,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box sx={{padding:"0px 90px"}} height="100%" display="flex" flexDirection="column" gap={1} >
      <Box
        padding={0}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} // tamanho do navBar
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Box flex={1}>
        <Typography
          variant={smDown ? "h4" : mdDown ? "h4" : "h3"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          fontWeight="bold"
        >
          {titulo}
        </Typography>

        </Box>
        <Box alignItems="left">
          <Button 
          variant="contained"
          startIcon={<Add/>}
          sx={{height:"50px", color:"black" }}
          >
            {nameButton}
          </Button>
        </Box>
      </Box>
      
      <Box flex={1} overflow="auto" >
        {children}
      </Box>
    </Box>
  );
};
