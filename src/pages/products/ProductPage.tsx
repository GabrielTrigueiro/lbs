import React, { useState, useEffect } from 'react'
import styles from "../../styles/Product/ProductPage.module.scss";
import { Add } from '@mui/icons-material';
import { Box, Typography, Button, Grid, Icon, SelectChangeEvent, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import { SwitchProductList } from '../../shared/components/switchProductList/SwitchProductList';
import { TableProductList } from '../../shared/components/table/product/TableProductList';
import { IDataProduct } from '../../shared/models/product';
import { ProductService } from '../../shared/services/api/product';
import { ISendPagination } from '../../shared/models/client';
import { ProductRegisterModal } from '../../shared/components/modal/Product/ProductRegisterModal';
import {SearchInput} from "../../shared/components/search";
import {TableProductBox} from "../../shared/components/table/product/TableProductBox";

export const ProductPage = () => {

    //gerenciamento de modais
    const [register, setRegister] = useState(false);
    const [edit, setEdit] = useState(false);
    function handleRegister(){
        setRegister(!register)
    }
    function handleEdit(){
        setEdit(!edit)
    }

    //disposição da lista de produtos
    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    function toggle() {
        setChecked(!checked);
    }

    //search
    const [selectContent, setSelectContent] = useState('5');
    const [pages, setPages] = useState<number>(0)
    const [value, setValue] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(5)
    const [actualpage, setActualPage] = useState<number>(0)
    let ProductPaginationConf: ISendPagination = {
        page: actualpage,
        pageSize: pageSize,
        param: "name",
        sortDirection: "DESC",
        sortField: "name",
        value: value,
    };
    function handleChange(event: React.ChangeEvent<unknown>, value: number) {
        setActualPage(value - 1);
    };
    function selectChange(event: SelectChangeEvent) {
        setSelectContent(event.target.value as string);
        const translate = parseInt(event.target.value as string)
        setActualPage(0)
        setPageSize(translate)
    };

    //armazenando produtos
    const [productList, setProductList] = useState<IDataProduct[]>([]);
    function update() {
        ProductService.getAll(ProductPaginationConf).then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                setIsLoading(false);
                setPages(result.data.numberOfPages)
                setProductList(result.data.data);
            }
        })
    }

    useEffect(() => {
        update();
    },[value, actualpage, pageSize])

    return (
        <div className={styles.container}>
            {/* top containers */}
            <Box className={styles.topContainer}>
                <Typography className={styles.topTitle}>Produtos</Typography>
                <Button className={styles.topButton} onClick={handleRegister} variant="contained" startIcon={<Add />}>
                    <Typography className={styles.topButtonText}>Cadastrar Produtos</Typography>
                </Button>
            </Box>
            <Box className={styles.midContainer}>
                <Grid className={styles.midGrid}>
                    <Grid className={styles.midLeft}>
                        <SwitchProductList change={toggle} state={checked} />
                        <Typography className={styles.midLeftTitle}>Lista de Produtos</Typography>
                        <Box position={"relative"} bottom={3}>
                            <SearchInput change={(value) => { setValue(value.target.value) }} />
                        </Box>
                    </Grid>
                    <Grid className={styles.midRight}>
                        <Box sx={{ mr: 2 }} flexDirection="row" display="flex" gap={1}>
                            <Icon sx={{ color: "#42FF00" }}>circle</Icon>
                            <Typography variant="subtitle1">Em estoque</Typography>
                        </Box>
                        <Box sx={{ mr: 2 }} flexDirection="row" display="flex" gap={1}>
                            <Icon sx={{ color: "#E4DB00" }}>circle</Icon>
                            <Typography variant="subtitle1">Ultimas und.</Typography>
                        </Box>
                        <Box flexDirection="row" display="flex" gap={1}>
                            <Icon sx={{ color: "#FF5555" }}>circle</Icon>
                            <Typography variant="subtitle1">Faltando</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* tabela de produtos */}
            <Box className={styles.table}>
                {checked ?
                    <TableProductBox productList={productList}/>
                :
                    <TableProductList lista={productList} update={update} />
                }
            </Box>

            {/* pagination e seltor de pagina*/}
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

            <ProductRegisterModal handleModal={handleRegister} state={register} update={update}/>
        </div>
    )
}