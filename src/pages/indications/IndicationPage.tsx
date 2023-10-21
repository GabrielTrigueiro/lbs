import React, { useEffect, useState } from 'react';
import { LayoutBasePage } from '../../shared/layouts';
import { Add } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  SelectChangeEvent,
} from '@mui/material';
import styles from '../../styles/Indication/Indication.module.scss';
import { SearchInput } from '../../shared/components/search';
import { ClientListPageSkeleton } from '../clients';
import { dataOneIndication } from '../../shared/models/indication';
import { IndicationService } from '../../shared/services/api/indication/IndicationService';
import { TableIndications } from '../../shared/components/table/TableIndications';
import { IndicationRegisterModal } from '../../shared/components/modal/Indication/IndicationRegisterModal';
import { ISendPagination } from '../../shared/models/client';

export const IndicationPage: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState<dataOneIndication[]>([]);

  const [confirm, setConfirm] = useState<true | false>(false);

  const [modalState, setModalState] = useState<true | false>(false);

  const [pages, setPages] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(5);

  const [actualpage, setActualPage] = useState<number>(0);

  const [selectContent, setSelectContent] = useState('5');

  let IndicacaoPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    param: 'name',
    sortDirection: 'DESC',
    sortField: 'name',
    value: value,
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value - 1);
  };

  const selectChange = (event: SelectChangeEvent) => {
    setSelectContent(event.target.value as string);
    const translate = parseInt(event.target.value as string);
    setActualPage(0);
    setPageSize(translate);
  };

  const update = () => {
    IndicationService.getAllIndicacoes(IndicacaoPaginationConf).then(
      (result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setIsLoading(false);
          setPages(result.numberOfPages);
          setRows(result.data);
        }
      }
    );
  };

  function handleModal() {
    setModalState(!modalState);
  }

  useEffect(() => {
    update();
  }, [value, actualpage, pageSize]);

  return (
    <div className={styles.container}>
      <Box className={styles.topContainer}>
        <Typography className={styles.topContainerTitle}>Indicações</Typography>
        <Button onClick={handleModal} variant="contained" startIcon={<Add />}>
          <Typography fontWeight={700} fontSize={'12px'}>
            Cadastrar Indicação
          </Typography>
        </Button>
      </Box>

      <Box className={styles.searchContainer}>
        <Grid className={styles.searchGrid}>
          <Grid display={'flex'} sx={{ borderBottom: '4px solid #E4DB00' }}>
            <Typography
              sx={{ color: '#3d3d3d', fontSize: '18px' }}
              variant="h5"
            >
              Lista de Indicações
            </Typography>
            <Box position={'relative'} bottom={3}>
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
            sx={{ borderBottom: '3px solid #D9D9D9' }}
          ></Grid>
        </Grid>
      </Box>

      <Box className={styles.table}>
        {isLoading ? (
          <ClientListPageSkeleton />
        ) : (
          <TableIndications lista={rows} update={update} />
        )}
      </Box>

      <Box display="flex" justifyContent="end" mt={1} alignItems={'center'}>
        <FormControl sx={{ width: '100px', ml: 1, mb: 0.5 }} size="small">
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
          page={actualpage + 1}
          onChange={handleChange}
        />
      </Box>

      <IndicationRegisterModal
        update={update}
        modalState={modalState}
        handleModal={handleModal}
      />
    </div>
  );
};
