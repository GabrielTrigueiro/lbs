import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

interface IConfirm {
    handleModal: ()=>void
    confirmStatus: boolean
    handleDialog: ()=>void
    confirmMessage: string
}

export const ConfirmationButton: React.FC<IConfirm> = ({
    handleModal,
    handleDialog,
    confirmStatus
}) => {

  return (
    <Dialog
      open={confirmStatus}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{confirmStatus}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{backgroundColor:'#E4DB00', color: '#000'}}
          onClick={() => {
            {handleDialog()};
            {handleModal()};
          }}
        >
          Fechar
        </Button>
        <Button sx={{backgroundColor:'#E4DB00', color: '#000'}} onClick={handleDialog}>Continuar</Button>
      </DialogActions>
    </Dialog>
  );
};
