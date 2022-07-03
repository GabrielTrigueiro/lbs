import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface IConfirm {
    modal: ()=>void
    status: boolean
    dialog: ()=>void
}

export const ConfirmationButton: React.FC<IConfirm> = ({
    modal,
    dialog,
    status
}) => {

  return (
    <Dialog
      open={status}
      onClose={dialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente fechar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog}>Continuar</Button>
        <Button
          onClick={() => {
            {dialog()};
            {modal()};
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
