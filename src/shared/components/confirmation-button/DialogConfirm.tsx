import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface props {
  dialogMessage: string;
  dialogState: boolean;
  setDialogState:()=> void;
  handleSomething:()=> void;
}

export const DialogConfirm: React.FC<props> = ({
  dialogState,
  setDialogState,
  dialogMessage,
  handleSomething,
}) => {
  return (
    <Dialog open={dialogState}>
      <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}
      >
        <DialogTitle>
          {"Confirmação"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              {dialogMessage}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ 
              backgroundColor: "#575A61",
              width:'100px',
            }}
            onClick={() => {
              {setDialogState();}
            }}
          >
            Cancelar
          </Button>
          <Button
            sx={{ 
              backgroundColor: "#575A61",
              width:'100px'
            }}
            onClick={() => {
              setDialogState();
              handleSomething();
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
