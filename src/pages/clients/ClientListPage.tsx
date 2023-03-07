import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem, Pagination, Typography
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { SearchInput } from "../../shared/components/search";
import { LayoutBasePage } from "../../shared/layouts";
import { ClienteService } from "../../shared/services";
import { ClientListPageSkeleton } from "./ClientListPageSkeleton";
import styles from "../../styles/Client/ClientPage.module.scss";
import { ClientRegisterModal } from "../../shared/components/modal/ClientRegisterModal";
import { ISendPagination, RegisterClient } from "../../shared/models/client";
import { TableClients } from "../../shared/components";

export const ClientListPage: React.FC = () => {

  const [value, setValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState<RegisterClient[]>([]);

  const [confirm, setConfirm] = useState<true | false>(false);

  const [modalState, setModalState] = useState<true | false>(false);

  const [pages, setPages] = useState<number>(0)

  const [pageSize, setPageSize] = useState<number>(5)

  const [actualpage, setActualPage] = useState<number>(0)

  const [selectContent, setSelectContent] = useState('5');

  function handleModal() {
    setModalState(!modalState);
  }

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

  return (
    <div className={styles.container}>
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
          </Grid>
        </Grid>
      </Box>

      <Box className={styles.table}>
        {isLoading ? <ClientListPageSkeleton /> : <TableClients update={update} lista={rows} />}
      </Box>

      <Box display="flex" justifyContent="end" mt={1} alignItems={'center'}>
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
          <Pagination
            count={pages}
            shape="rounded" 
            page={actualpage+1}
            onChange={handleChange}
          />
      </Box>

      <ClientRegisterModal update={update} handleModal={handleModal} modalState={modalState}/>

    </div>
  );
};
