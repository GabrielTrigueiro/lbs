import {createTheme} from '@mui/material'

export const LightTheme = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    height: 60
                },
                regular: {
                    minHeight: 20,
                    "@media (min-width: 600px)": {
                        minHeight: 0
                    }
                }
            }
        },
    },
    palette:{
        primary:{
            //cores de botões
            main: '#E4DB00',
            dark: '#E4DB00'[800],
            light: '#E4DB00'[500],
            contrastText: '#ffffff',
        },
        text: {
            primary:'#000',
            secondary: '#6F6F6F',
        },
        background:{ 
            default: '#f0f5f8', //Fundo da pagina
            paper: '#fff', //cards
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
    
});