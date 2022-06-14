import {createTheme} from '@mui/material'
import { cyan, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette:{
        primary:{
            //cores de botões
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff',
        },
        secondary:{
            //cores de botões
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background:{ 
            default: '#f7f6f3', //Funda da pagina
            paper: '#ffffff', //cards
        }
    }
});