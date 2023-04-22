import { createTheme } from "@mui/material";

const DefaultTheme = createTheme({
  palette:{
    primary:{
      main:"#D9D9D9",
      dark:"#575A61",
    },
    secondary:{
      main:"#E4DB00",
      light:"#fffb91",
    }
  },
  typography:{
    fontFamily:"Poppins",
  },
  components:{
    MuiButton:{
      defaultProps:{
        color:"secondary",
      },
      variants: [
        {
          props:{variant:"contained"},
          style: ({theme}) => ({
            boxShadow: "none",
            fontSize: "1pc",
            borderColor: "transparent",
            "&:hover":{
              boxShadow: "none",
              backgroundColor: theme.palette.secondary.light,
            }
          })
        }
      ],
    },
    MuiPaper:{
      defaultProps:{
        style:{
          boxShadow:"none"
        }
      }
    }
  },
});

export default DefaultTheme;
