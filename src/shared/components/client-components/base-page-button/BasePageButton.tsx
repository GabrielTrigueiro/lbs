import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import Add from "@mui/icons-material/Add";
import { ConfirmationButton } from "../confirmation-button/ConfirmationButton";

interface IButtonBaseLayout {
  nameModalButton: string;
  modal: ()=>void
  statusModal: boolean
  statusDialog: boolean
  dialog: ()=>void
}

export const BasePageButton: React.FC<IButtonBaseLayout> = ({
  children,
  nameModalButton,
  dialog,
  modal,
  statusModal,
  statusDialog
}) => {
  
  return (
    <Box alignItems="left">
      <Button
        onClick={modal}
        variant="contained"
        startIcon={<Add />}
        sx={{ height: "50px", color: "black" }}
      >
        {nameModalButton}
      </Button>

      <Modal sx={{minWidth:1020}} onClose={dialog} open={statusModal}>
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

      <ConfirmationButton
        dialog={dialog}
        modal={modal}
        status={statusDialog}
      />
    </Box>
  );
};
