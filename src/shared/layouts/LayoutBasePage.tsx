import { Box } from "@mui/system";
import { ReactNode } from "react";
import styles from "../../styles/Layout/Layout.module.scss";

interface ILayoutBasePageProps {
  barraDeFerramentas?: ReactNode;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
}) => {

  return (
    <Box className={styles.container}>
      {children}
    </Box>
  );
};
