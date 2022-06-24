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

      <Modal sx={{minWidth:1020}} onClose={handleClose} open={open}>
        <Box
        sx={{
          //posição do modal
          position: 'absolute' as 'absolute',
          top: '40%',
          left: '50%',
          height: 500,
          width: 1000,
          transform: 'translate(-50%, -40%)',

          //CSS estilo
          borderRadius:1,
          borderColor:'transparent',
          bgcolor: 'background.paper',
          display:'flex',
          flexDirection:'column',
          padding:1,

          alignItems:'center',
          justifyContent:'center'
        }}>
          {children}
        </Box>
      </Modal>
    </Box>
  );
};
