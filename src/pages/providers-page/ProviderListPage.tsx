import { Add } from "@mui/icons-material";
import { Box, Typography, Button, Grid, Icon, Pagination, Stack, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmationButton } from "../../shared/components";
import { SearchInput } from "../../shared/components/search";
import { TableProviders } from "../../shared/components/table-fornecedores/TableProviders";
import { ProviderForm } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { ISendPagination } from "../../shared/services";
import { IInfoProvider, ProviderService } from "../../shared/services/api/providers/ProviderService";

export const ProviderListPage: React.FC = () => {
  
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState<IInfoProvider[]>([])
  const [confirm, setConfirm] = useState<true | false>(false);
  const [modal, setModal] = useState<true | false>(false);
  const [pages, setPages] = useState<number>(0)
  const [actualpage, setActualPage] = useState<number>(0)

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  }

  const handleConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true)
  }

  const handleChange = (
    event: React.ChangeEvent<unknown>, value: number
  ) => {
    setActualPage(value-1);
  };

  useEffect(() => {
    update();
  }, [value, actualpage])

  const update = () => {
    ProviderService.getAll(ProviderPaginationConf).then((result) => {
      if (result instanceof Error) {
        alert(result.message)
      } else {
        setIsLoading(false)
        setPages(result.data.numberOfPages)
        setRows(result.data.data)
      }
    })
  }

  let ProviderPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: 3,
    param: "name",
    sortDiresction: "DESC",
    sortField: "name",
    value: value,
  };

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
          Fornecedores{" "}
        </Typography>
        <Button
          onClick={handleModal}
          variant="contained"
          startIcon={<Add />}
          sx={{ height: 45, width: 200, color: "#494b4f" }}
        >
          <Typography fontSize={"10px"} sx={{ fontWeight: "bold" }}>
            Cadastrar Fornecedor
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
              Lista de Fornecedores
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
          </Grid>
        </Grid>
        <Box flexDirection="row" display="flex" gap={10}></Box>
      </Box>
      
      <Box sx={{ padding: 0 }}>
        <TableProviders update={update} lista={rows} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Stack>
          <Pagination
            count={pages}
            variant="outlined"
            shape="circular" 
            page={actualpage+1}
            onChange={handleChange}
          />
        </Stack>
      </Box>

      <Modal sx={{minWidth:1020}} onClose={handleConfirm} open={modal}>
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
        }}>
          <ProviderForm
          tittle="Cadastrar Fornecedor"
          type={"register"}
          update={update}
          handleModal={handleModal}/>
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
