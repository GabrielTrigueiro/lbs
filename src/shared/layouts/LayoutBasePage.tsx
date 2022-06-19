import {
  Icon,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import { useDrawerContext } from "../contexts";
import Add from "@mui/icons-material/Add";
import { boolean } from "yup";
import { ButtonBaseLayout } from "./ButtonBaseLayout";

interface ILayoutBasePageProps {
  barraDeFerramentas?: ReactNode;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
}) => {

  return (
    <Box
      sx={{ padding: "0px 90px" }}
      height="100%"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
