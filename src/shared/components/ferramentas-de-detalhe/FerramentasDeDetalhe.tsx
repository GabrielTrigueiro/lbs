import { Box, Paper, useTheme, Icon, Button, Divider } from "@mui/material";

export const FerramentasDeDetalhe: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
      component={Paper}
    >
     
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
        >
          salvar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
        >
          salvar e voltar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
        >
          apagar
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
        >
          NOVO
        </Button>
        <Divider variant="middle" orientation="vertical"/>
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
        >
          VOLTAR
        </Button>
    </Box>
  );
};
