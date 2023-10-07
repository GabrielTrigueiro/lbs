import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import useDialogConfirmation from 'shared/hooks/dialogs/DialogConfirmation';

interface GenericDialogProps {
  title: string;
  confirmAction: () => void;
}

const GenericDialog = ({ confirmAction, title }: GenericDialogProps) => {
  const { isOpenDialog, onCloseDialog } = useDialogConfirmation();

  function confirm() {
    onCloseDialog();
    confirmAction();
  }

  return (
    <Dialog open={isOpenDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button fullWidth variant="contained" onClick={onCloseDialog}>
          Não
        </Button>
        <Button fullWidth variant="contained" onClick={confirm}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
