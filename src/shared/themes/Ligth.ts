import {createTheme} from '@mui/material'
import { yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
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
            default: '#ebedf0', //Funda da pagina
            paper: '#F5F5F5', //cards
        },
    },
});