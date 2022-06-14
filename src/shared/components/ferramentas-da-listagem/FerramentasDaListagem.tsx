import { Box, Button, Paper, TextField, useTheme, Icon } from "@mui/material";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo= true ,
}) => {
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
      {mostrarInputBusca && (
      <TextField
        size="small"
        value={textoDaBusca}
        onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        placeholder="Pesquisar..."
      />)}
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (<Button
          variant="contained"
          color="primary"
          onClick={aoClicarEmNovo}
          disableElevation
          endIcon={<Icon>add</Icon>}
        >
          {textoBotaoNovo}
        </Button>)}
      </Box>
    </Box>
  );
};
