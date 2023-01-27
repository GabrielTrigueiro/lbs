import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Stack,
  Typography
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { ConfirmationButton } from "../../shared/components";
import { TableClients } from "../../shared/components/client-components/table-clients";
import { SearchInput } from "../../shared/components/search";
import { CadastroClienteForm } from "../../shared/forms/client/ClienteForm";
import { LayoutBasePage } from "../../shared/layouts";
import { ClienteService, IInfoClient, ISendPagination } from "../../shared/services";
import { ClientListPageSkeleton } from "./ClientListPageSkeleton";
import styles from "../../styles/Client/ClientPage.module.scss";

export const ClientListPage: React.FC = () => {

  const [value, setValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState<IInfoClient[]>([]);

  const [confirm, setConfirm] = useState<true | false>(false);

  const [modal, setModal] = useState<true | false>(false);

  const [pages, setPages] = useState<number>(0)

  const [pageSize, setPageSize] = useState<number>(5)

  const [actualpage, setActualPage] = useState<number>(0)

  const [selectContent, setSelectContent] = useState('');

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  const handleConfirm = () => {
    confirm ? setConfirm(false) : setConfirm(true);
  };

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
    setActualPage(value-1);
  };  

  let ClientPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    param: "name",
    sortDiresction: "DESC",
    sortField: "name",
    value: value,
  };

  const selectChange = (event: SelectChangeEvent) => {
    setSelectContent(event.target.value as string);
    const translate = parseInt(event.target.value as string)
    setActualPage(0)
    setPageSize(translate)
  };

  useEffect(() => {
    update();
  }, [value, actualpage, pageSize]);

  if (isLoading) return <ClientListPageSkeleton />;
  return (
    <LayoutBasePage>
      <Box className={styles.topContainer}>
        <Typography className={styles.topTitle}>Clientes</Typography>
        <Button className={styles.topButton} onClick={handleModal} variant="contained" startIcon={<Add />}>
          <Typography className={styles.topButtonText}>Cadastrar Clientes</Typography>
        </Button>
      </Box>

      <Box className={styles.midContainer}>
        <Grid className={styles.midGrid}>
          <Grid  className={styles.midLeft}>
            <Typography className={styles.midLeftTitle}>Lista de Clientes</Typography>
            <Box position={"relative"} bottom={3}>
              <SearchInput change={(value)=>{setValue(value.target.value)}}/>
            </Box>
          </Grid>
          <Grid className={styles.midRight}>
            <Box sx={{ mr: 2 }} flexDirection="row" display="flex" gap={1}>
              <Icon sx={{ color: "#42FF00" }}>circle</Icon>
              <Typography variant="subtitle1">Ativo</Typography>
            </Box>
            <Box flexDirection="row" display="flex" gap={1}>
              <Icon sx={{ color: "#FF5555" }}>circle</Icon>
              <Typography variant="subtitle1">Inativo</Typography>
            </Box>
            <FormControl sx={{width:'100px', ml:1, mb:0.5}} size="small">
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
        <TableClients update={update} lista={rows} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={1}>
        
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
