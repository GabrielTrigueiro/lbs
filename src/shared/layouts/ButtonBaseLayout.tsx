import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";
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
  const [modal, setModal] = useState<true | false>(false);
  const handleModal = () => { modal ? setModal(false) : setModal(true) }

  const [confirm, setConfirm] = useState<true | false>(false);
  const handleConfirm = () => { confirm ? setConfirm(false) : setConfirm(true) }
  
  return (
    <Box alignItems="left">
      <Button
        onClick={handleModal}
        variant="contained"
        startIcon={<Add />}
        sx={{ height: "50px", color: "black" }}
      >
        {nameModalButton}
      </Button>

      <Modal sx={{minWidth:1020}} onClose={handleConfirm} open={modal}>
        <Box
        sx={{
          overflow:'auto',

          //posição do modal
          position: 'absolute' as 'absolute',
          top: '40%',
          left: '50%',
          height: 600,
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

      <Dialog
        open={confirm}
        onClose={handleConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmação"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja realmente fechar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Continuar</Button>
          <Button onClick={() => { handleConfirm(); handleModal(); }}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
