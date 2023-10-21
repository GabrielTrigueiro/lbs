import { Add } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Pagination,
} from '@mui/material';
import styles from '../../styles/Categories/Categories.module.scss';
import { SearchInput } from '../../shared/components/search';
import { useEffect, useState } from 'react';
import { ClientListPageSkeleton } from '../clients';
import { CategoryService } from '../../shared/services/api/categories/Categories_Service';
import { ISendPagination } from '../../shared/models/client';
import { ICategory } from '../../shared/models/categories';
import { TableCategories } from '../../shared/components/table/TableCategories';
import { CategoryRegisterModal } from '../../shared/components/modal/Category/CategoryRegisterModal';

export const Categories = () => {
  //modal registrar categoria
  const [modalState, setModalState] = useState<true | false>(false);
  function handleModal() {
    setModalState(!modalState);
  }

  //categorias data
  const [rows, setRows] = useState<ICategory[]>([]);

  //skeleton ou tabela
  const [isLoading, setIsLoading] = useState(true);

  //pagination e seletor
  const [pages, setPages] = useState<number>(0);
  const [selectContent, setSelectContent] = useState('5');
  const [actualpage, setActualPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const selectChange = (event: SelectChangeEvent) => {
    setSelectContent(event.target.value as string);
    const translate = parseInt(event.target.value as string);
    setActualPage(0);
    setPageSize(translate);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value - 1);
  };

  //search
  const [value, setValue] = useState<string>('');
  let CategoryPaginationConf: ISendPagination = {
    page: actualpage,
    pageSize: pageSize,
    param: 'name',
    sortDirection: 'DESC',
    sortField: 'name',
    value: value,
  };

  //buscar categorias e gerenciar laoding
  const update = () => {
    CategoryService.getAllCategories(CategoryPaginationConf).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setIsLoading(false);
        setPages(result.numberOfPages);
        setRows(result.data);
      }
    });
  };

  useEffect(() => {
    update();
  }, [value, actualpage, pageSize]);

  return (
    <div className={styles.container}>
      <Box className={styles.topContainer}>
        <Typography className={styles.topContainerTitle}>Categorias</Typography>
        <Button onClick={handleModal} variant="contained" startIcon={<Add />}>
          <Typography fontWeight={700} fontSize={'12px'}>
            Cadastrar categoria
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
              Lista de categorias
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
          <TableCategories lista={rows} update={update} />
        )}
      </Box>

      <Box display="flex" justifyContent="end" mt={1} alignItems={'center'}>
        <FormControl sx={{ width: '100px', ml: 1, mb: 0.5 }} size="small">
          <InputLabel id="demo-simple-select-label">nº itens</InputLabel>
          <Select
            size="small"
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

      <CategoryRegisterModal
        handleModal={handleModal}
        modalState={modalState}
        update={update}
      />
    </div>
  );
};
