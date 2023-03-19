import React, { useState } from 'react'
import styles from "../../styles/Product/Products.module.scss";
import { Add } from '@mui/icons-material';
import { Box, Typography, Button, Grid, Icon } from '@mui/material';
import {SwitchProductList} from '../../shared/components/switchProductList/SwitchProductList';

export const ProductPage = () => {

    //disposição da lista de produtos
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
      setChecked(!checked);
    };

    return (
        <div className={styles.container}>
            {/* top containers */}
            <Box className={styles.topContainer}>
                <Typography className={styles.topTitle}>Produtos</Typography>
                <Button className={styles.topButton} /*onClick={handleModal}*/ variant="contained" startIcon={<Add />}>
                    <Typography className={styles.topButtonText}>Cadastrar Produtos</Typography>
                </Button>
            </Box>
            <Box className={styles.midContainer}>
                <Grid className={styles.midGrid}>
                    <Grid className={styles.midLeft}>
                        <SwitchProductList change={handleChange} state={checked}/>
                        <Typography className={styles.midLeftTitle}>Lista de Produtos</Typography>
                        <Box position={"relative"} bottom={3}>
                            {/* <SearchInput change={(value) => { setValue(value.target.value) }} /> */}
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
                oi  
            </Box>
        </div>
    )
}
