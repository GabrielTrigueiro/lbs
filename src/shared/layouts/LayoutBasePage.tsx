import {
  Icon,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import { useDrawerContext } from "../contexts";
import Add from "@mui/icons-material/Add";

interface ILayoutBasePageProps {
  titulo: string;
  barraDeFerramentas?: ReactNode;
  nameButton: string;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  children,
  titulo,
  nameButton,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  //abrir e fechar o modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box
      sx={{ padding: "0px 90px" }}
      height="100%"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box
        padding={0}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} // tamanho do navBar
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Box flex={1}>
          <Typography
            variant={smDown ? "h4" : mdDown ? "h4" : "h3"}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            fontWeight="bold"
          >
            {titulo}
          </Typography>
        </Box>
        <Box alignItems="left">
          <Button
            onClick={handleOpen}
            variant="contained"
            startIcon={<Add />}
            sx={{ height: "50px", color: "black" }}
          >
            {nameButton}
          </Button>
        </Box>
      </Box>

      <Box flex={1} overflow="auto">
        {children}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            //posição do modal
            position: "absolute" as "absolute",
            top: "45%",
            left: "50%",
            height: "80%",
            width: "60%",
            transform: "translate(-50%, -40%)",

            //CSS estilo
            borderRadius: 4,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: 5,
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "32px" }}
            variant="h6"
            component="h2"
          >
            {nameButton}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            label="Nome Completo"
            type="text"
            variant="standard"
          />
          <Box display={"flex"}>
            <Box mt={2} width={"50%"}>
              <TextField
                sx={{ mb: 2, width: "90%" }}
                label="Celular"
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: "90%" }}
                label="Email"
                type="email"
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: "90%" }}
                label="Endereço"
                type="text"
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: "90%" }}
                label="CEP"
                type="text"
                variant="standard"
              />
            </Box>
            <Box mt={2} flexDirection={"inherit"} width={"50%"}>
              <TextField
                sx={{ mb: 2, width: "100%" }}
                label="CPF"
                type="number"
                variant="standard"
              />
              <TextField
                sx={{ mb: 2, width: "100%" }}
                label="Telefone"
                type="number"
                variant="standard"
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "100%",
              weight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              sx={{ width: "200px", height: "60px" }}
              variant={"contained"}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
