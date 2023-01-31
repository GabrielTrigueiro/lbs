import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ConfirmationButton } from "../../shared/components";
import { SearchInput } from "../../shared/components/search";
import { TableProviders } from "../../shared/components/provider-components/TableProviders";
import { ProviderForm } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { IInfoProvider, ProviderService } from "../../shared/services/api/providers/ProviderService";
import styles from "../../styles/Provider/Provider.module.scss";
import {
  Box,
  Typography,
  Button,
  Grid,
  Icon,
  Pagination,
  Stack,
  Modal,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ClientListPageSkeleton } from "../clients";
import { ISendPagination } from "../../shared/models/client";

export const ProviderListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<IInfoProvider[]>([]);
  const [confirm, setConfirm] = useState<true | false>(false);
  const [modal, setModal] = useState<true | false>(false);
  const [pages, setPages] = useState<number>(0);
  const [actualpage, setActualPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectContent, setSelectContent] = useState("");

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  const handleConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value - 1);
  };

  useEffect(() => {
    update();
  }, [value, actualpage, pageSize]);

  const update = () => {
    ProviderService.getAll(ProviderPaginationConf).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setIsLoading(false);
        setPages(result.data.numberOfPages);
        setRows(result.data.data);
      }
    });
  };

  const selectChange = (event: SelectChangeEvent) => {
    setSelectContent(event.target.value as string);
    const translate = parseInt(event.target.value as string);
    setActualPage(0);
    setPageSize(translate);
  };

  let ProviderPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    param: "name",
    sortDiresction: "DESC",
    sortField: "name",
    value: value,
  };

  return (
    <LayoutBasePage>
      <Box className={styles.topContainer}>
        <Typography className={styles.topContainerTitle}>Fornecedores</Typography>
        <Button className={styles.topButton} onClick={handleModal} variant="contained" startIcon={<Add />}>
          <Typography className={styles.topButtonText}>Cadastrar Fornecedor</Typography>
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
              <SearchInput
                change={(value) => {
                  setValue(value.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid
            justifyContent="flex-end"
            display="flex"
            flex={1}
            sx={{ borderBottom: "3px solid #D9D9D9" }}
          >
            <FormControl sx={{ width: "100px", ml: 1, mb: 0.5 }} size="small">
              <InputLabel id="demo-simple-select-label">nº itens</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectContent}
                label="nº itens"
                onChange={selectChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box flexDirection="row" display="flex" gap={10}></Box>
      </Box>

      <Box className={styles.table}>
        {isLoading ? <ClientListPageSkeleton /> : <TableProviders update={update} lista={rows} />}
      </Box>

      <Box display="flex" justifyContent="center" mt={1}>
          <Pagination
            count={pages}
            shape="rounded" 
            page={actualpage+1}
            onChange={handleChange}
          />
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
          <ProviderForm
            tittle="Cadastrar Fornecedor"
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
