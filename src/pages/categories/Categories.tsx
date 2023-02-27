import { Add } from '@mui/icons-material'
import { Box, Typography, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Pagination } from '@mui/material'
import styles from "../../styles/Categories/Categories.module.scss"
import { SearchInput } from '../../shared/components/search'
import { useState } from 'react'
import { ClientListPageSkeleton } from '../clients'

export const Categories = () => {
  //search
  const [value, setValue] = useState<string>("")
  //pagination e seletor
  const [pages, setPages] = useState<number>(0)
  const [selectContent, setSelectContent] = useState('5')
  const [actualpage, setActualPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)
  const selectChange = (event: SelectChangeEvent) => {
    setSelectContent(event.target.value as string)
    const translate = parseInt(event.target.value as string)
    setActualPage(0)
    setPageSize(translate)
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setActualPage(value - 1);
  };
  return (

    <div className={styles.container}>

      <Box className={styles.topContainer}>
        <Typography className={styles.topContainerTitle}>Categorias</Typography>
        <Button className={styles.topButton} /*onClick={handleModal}*/ variant="contained" startIcon={<Add />}>
          <Typography className={styles.topButtonText}>Cadastrar categoria</Typography>
        </Button>
      </Box>

      <Box className={styles.searchContainer}>
        <Grid className={styles.searchGrid}>
          <Grid display={"flex"} sx={{ borderBottom: "4px solid #E4DB00" }}>
            <Typography sx={{ color: "#3d3d3d", fontSize: "18px" }} variant="h5">Lista de categorias</Typography>
            <Box position={"relative"} bottom={3}>
              <SearchInput change={(value) => { setValue(value.target.value); }} />
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
      </Box>

      <Box className={styles.table}>
        <ClientListPageSkeleton />
      </Box>

      <Box display="flex" justifyContent="end" mt={1} alignItems={"center"}>
        <FormControl sx={{ width: "100px", ml: 1, mb: 0.5 }} size="small">
          <InputLabel id="demo-simple-select-label">nº itens</InputLabel>
          <Select
            size='small'
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
    </div>
  )
}
