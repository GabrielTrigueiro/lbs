import { LayoutBasePage } from "../../shared/layouts";
import { CadastroClienteForm } from "../../shared/forms/formularios-cliente/CadastroClienteForm";
import { useEffect, useState } from "react";
import { ClienteService, IInfoClient } from "../../shared/services";
import { ClientListPageSkeleton } from "./ClientListPageSkeleton";
import { TableClients } from "../../shared/components/client-components/table-clients";
import {
  Box,
  Icon,
  Typography,
  Grid,
  Stack,
  Pagination,
  Button,
  Modal,
} from "@mui/material";
import { SearchInput } from "../../shared/components/search";
import { Add } from "@mui/icons-material";
import { ConfirmationButton } from "../../shared/components";

export const ClientListPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState<IInfoClient[]>([])
  
  const [confirm, setConfirm] = useState<true | false>(false);
  const handleConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true)
  }

  const [modal, setModal] = useState<true | false>(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  }

  useEffect(() => {
    update();
  }, [])
  const update = () => {
    ClienteService.getAll().then((result) => {
      if (result instanceof Error) {
        alert(result.message)
      } else {
        setIsLoading(false)
        setRows(result.data.data)
      }
    })
  }

  if (isLoading) return <ClientListPageSkeleton />;
  return (
    <LayoutBasePage>

      <Box
        justifyContent={"space-between"}
        padding={0}
        display="flex"
        alignItems="center"
      >
        <Typography sx={{ margin: "40px 0px", fontWeight: 600, fontSize: "40px" }}> Clientes </Typography>
        <Button onClick={handleModal} variant="contained" startIcon={<Add />} sx={{ height: "50px", color: "black" }}>
          Cadastrar Cliente
        </Button>
      </Box>

      <Box margin="0px" display="flex">
        <Grid display="flex" direction="row" container flex={1}>
          <Grid display={"flex"} sx={{ borderBottom: "4px solid #E4DB00" }}>
            <Typography variant="h5">Lista de Clientes</Typography>
            <Box position={"relative"} bottom={3}>
              <SearchInput/>
            </Box>
          </Grid>
          <Grid
            justifyContent="flex-end"
            display="flex"
            flex={1}
            sx={{ borderBottom: "3px solid #D9D9D9" }}
          >
            <Box sx={{ mr: 2 }} flexDirection="row" display="flex" gap={1}>
              <Icon sx={{ color: "#42FF00" }}>circle</Icon>
              <Typography variant="subtitle1">Ativo</Typography>
            </Box>
            <Box flexDirection="row" display="flex" gap={1}>
              <Icon sx={{ color: "#FF5555" }}>circle</Icon>
              <Typography variant="subtitle1">Inativo</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box flexDirection="row" display="flex" gap={10}></Box>
      </Box>

      <Box sx={{ padding: 0 }}>
        <TableClients update={update} lista={rows} />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Stack>
          <Pagination count={4} variant="outlined" shape="rounded" />
        </Stack>
      </Box>

      <Modal sx={{minWidth:1020}} onClose={handleConfirm} open={modal}>
        <Box
        sx={{
          overflow:'auto',
          //posição do modal
          position: 'absolute' as 'absolute',
          top: '40%',
          left: '50%',
          height: 600,
          width: 1000,
          transform: 'translate(-50%, -40%)',

          //CSS estilo
          borderRadius:1,
          borderColor:'transparent',
          bgcolor: 'background.paper',
          display:'flex',
          flexDirection:'column',
          padding:1,

          alignItems:'center',
          justifyContent:'center'
        }}>
          <CadastroClienteForm update={update} handleModal={handleModal}/>
        </Box>
      </Modal>

      <ConfirmationButton 
        confirmMessage="Deseja realmente fechar?"
        handleDialog={handleConfirm}
        handleModal={handleModal}
        confirmStatus={confirm}
      />

    </LayoutBasePage>
  );
};
