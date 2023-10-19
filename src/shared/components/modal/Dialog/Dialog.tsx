import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import useDialogConfirmation from 'shared/hooks/dialogs/DialogConfirmation';

interface GenericDialogProps {
  onCloseDialog: () => void;
  isOpenDialog: boolean;
  title: string;
  oneOption?: boolean;
  oneOptionLabel?: string;
  confirmAction: () => void;
}

const GenericDialog = ({
  confirmAction,
  title,
  oneOption,
  oneOptionLabel,
  isOpenDialog,
  onCloseDialog,
}: GenericDialogProps) => {
  function confirm() {
    onCloseDialog();
    confirmAction();
  }

  return (
    <Dialog open={isOpenDialog}>
      <DialogTitle>{title}</DialogTitle>
      {oneOption ? (
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button fullWidth variant="contained" onClick={confirm}>
            {oneOptionLabel}
          </Button>
        </DialogActions>
      ) : (
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button fullWidth variant="contained" onClick={onCloseDialog}>
            Não
          </Button>
          <Button fullWidth variant="contained" onClick={confirm}>
            Sim
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default GenericDialog;
