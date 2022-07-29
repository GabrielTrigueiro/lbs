import React, { createContext, useContext, useState } from "react";
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Stack, Snackbar, Typography } from "@mui/material";

class Snack {
    message?: string;
    color?: AlertColor;
    autoHideDuration?: number;
    open: boolean;
  
    constructor(data: Snack) {
      this.message = data.message || '';
      this.color = data.color || 'info';
      this.autoHideDuration = data.autoHideDuration || 3000;
      this.open = data.open;
    }
}

export {Snack}

type SnackDefaultValue = {
    snack: Snack,
    setSnack: React.Dispatch<React.SetStateAction<Snack>>
};

export const SnackbarContext = createContext<SnackDefaultValue>({
    snack: new Snack({open: false}),
    setSnack: () => {}
})

export const TesteSnackBar: React.FC = ({children}) => {

    const [snack, setSnack] = useState(new Snack({open: false}));

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnack(new Snack({color: snack.color, open:false}));
        };
    
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
        function Alert(props,ref,){
        return(
            <MuiAlert
                elevation={6}
                ref={ref}
                variant="filled"
                {...props}
            />
        )
    })
    
    return (
        <SnackbarContext.Provider value={{snack, setSnack}}>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal:'right'
                    }}
                    open={snack.open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert 
                    sx={{
                        width: '200px',
                        display:'flex',
                        alignItems:'center'
                    }}
                    onClose={handleClose}
                    severity={snack.color}>
                        <Typography>{snack.message}</Typography>
                    </Alert>
                </Snackbar>
            </Stack>
            {children}
        </SnackbarContext.Provider>
    );
};
