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
            main: '#E4DB00',
        },
        secondary:{
            main: '##5348',
            light: '##575a61',
            dark: '##575a61',
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
})

export const FontsColors = createTheme ({
    palette:{
        primary:{
            main: '##5348',
        }
    }
})
