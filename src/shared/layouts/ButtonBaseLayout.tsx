import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Add from "@mui/icons-material/Add";

interface IButtonBaseLayout {
  nameModalButton: string;
}

export const ButtonBaseLayout: React.FC<IButtonBaseLayout> = ({
  children,
  nameModalButton,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box alignItems="left">
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<Add />}
        sx={{ height: "50px", color: "black" }}
      >
        {nameModalButton}
      </Button>

      <Modal onClose={handleClose} open={open}>
        <Box>{children}</Box>
      </Modal>
    </Box>
  );
};
