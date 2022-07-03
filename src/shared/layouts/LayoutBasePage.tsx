import { Box } from "@mui/system";
import { ReactNode, useState } from "react";

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
