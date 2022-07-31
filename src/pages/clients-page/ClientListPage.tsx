import { LayoutBasePage } from "../../shared/layouts";
import { CadastroClienteForm } from "../../shared/forms/form-client/ClienteForm";
import { useEffect, useState } from "react";
import { ClientListPageSkeleton } from "./ClientListPageSkeleton";
import { TableClients } from "../../shared/components/client-components/table-clients";
import { SearchInput} from "../../shared/components/search";
import { Add } from "@mui/icons-material";
import { ConfirmationButton } from "../../shared/components";
import { ClienteService, IClientSearch, IInfoClient, IReceivePagination, ISendPagination } from "../../shared/services";
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

export const ClientListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<IInfoClient[]>([]);
  const [confirm, setConfirm] = useState<true | false>(false);
  const [modal, setModal] = useState<true | false>(false);
  const [pages, setPages] = useState<number>(0)
  const [actualpage, setActualPage] = useState<number>(0)

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  const handleConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true);
  };
  useEffect(() => {
    update();
  }, [value]);
  const update = () => {
    ClienteService.getAll(ClientPaginationConf).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setIsLoading(false);
        setPages(result.data.numberOfPages)
        setRows(result.data.data);
      }
    });
  };

  const handleChange = (
    event: React.ChangeEvent<unknown>, value: number
  ) => {
    // update()
    setActualPage(value);
    console.log(actualpage)
  };

  let ClientPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: 5,
    param: "name",
    sortDiresction: "DESC",
    sortField: "name",
    value: value,
  };

  if (isLoading) return <ClientListPageSkeleton />;
  return (
    <LayoutBasePage>
      <Box
        justifyContent={"space-between"}
        padding={0}
        display="flex"
        alignItems="center"
      >
        <Typography
          sx={{
            margin: "40px 0px",
            fontWeight: 600,
            fontSize: "35px",
            color: "#575a61",
          }}
        >
          Clientes
        </Typography>
        <Button
          onClick={handleModal}
          variant="contained"
          startIcon={<Add />}
          sx={{ height: 45, width: 200, color: "#494b4f" }}
        >
          <Typography fontSize={"12px"} sx={{ fontWeight: "bold" }}>
            Cadastrar Clientes
          </Typography>
        </Button>
      </Box>

      <Box margin="0px" display="flex">
        <Grid display="flex" direction="row" container flex={1}>
          <Grid display={"flex"} sx={{ borderBottom: "4px solid #E4DB00" }}>
            <Typography
              sx={{ color: "#3d3d3d", fontSize: "18px" }}
              variant="h5"
            >
              Lista de Clientes
            </Typography>
            <Box position={"relative"} bottom={3}>
              <SearchInput change={(value)=>{setValue(value.target.value)}}/>
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

      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Stack>
          <Pagination
            count={pages}
            variant="outlined"
            shape="circular" 
            defaultPage={0}
            page={actualpage}
            onChange={handleChange}
          />
        </Stack>
      </Box>

      <Modal sx={{ minWidth: 1020 }} onClose={handleConfirm} open={modal}>
        <Box
          sx={{
            overflow: "auto",
            //posição do modal
            position: "absolute" as "absolute",
            top: "40%",
            left: "50%",
            height: "600px",
            width: "1000px",
            transform: "translate(-50%, -40%)",

            //CSS estilo
            borderRadius: 0,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: 0,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CadastroClienteForm
            tittle={'Cadastrar Cliente'}
            type={"register"}
            update={update}
            handleModal={handleModal}
          />
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
