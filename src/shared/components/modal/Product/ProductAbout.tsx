import {Box, Button, Skeleton, TextField} from '@mui/material';
import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {IDataProduct, IProductInformation} from "../../../models/product";

interface IProductAbout {
  informacoes: IProductInformation[];
}

export const ProductInfos = ({informacoes}: IProductAbout) => {

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center'}}>
      <Box sx={{display: 'flex', alignItems: 'center', width: '100%', gap: 2}}>
        <Skeleton
          variant="rectangular"
          sx={{
            minWidth: 230,
            minHeight: 230,
            borderRadius: 1,
          }}
        />
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, width: '100%'}}>
          <TextField fullWidth size="small" label={'Código de barras'} autoComplete="off"/>
          <TextField fullWidth size="small" label={'Nome'} autoComplete="off"/>
          <TextField fullWidth size="small" label={'Descrição'} autoComplete="off"/>
          <TextField fullWidth
                     size="small"
                     label={'Quantidade em estoque'}
                     autoComplete="off"
          />
          <TextField fullWidth
                     size="small"
                     label={'Categoria'}
                     autoComplete="off"
          />
        </Box>
      </Box>
      <Box sx={{height: 250, display: 'flex', gap: 1}}>
        <Box sx={{display: 'flex', flexDirection: "column", gap: 1}}>
          <DataGrid
            disableColumnFilter={true}
            disableColumnMenu={true}
            disableColumnSelector={true}
            hideFooter={true}
            sx={{overflow: "hidden", width: 350}}
            localeText={{noRowsLabel: "Nenhuma informação cadastrada"}}
            rows={informacoes.map((info, index) => ({...info, id: index + 1}))}
            columns={[
              {field: "color", headerName: "Cor", flex: 1},
              {field: "quantity", headerName: "Quantidade", flex: 1},
              {field: "size", headerName: "Tamanho", flex: 1},
            ]}
          />
          <Button variant={'contained'}>Adicionar informação</Button>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            <TextField
              size="small"
              label={'Preço custo'}
              autoComplete="off"
            />
            <TextField
              size="small"
              label={'Preço etiqueta'}
              autoComplete="off"
            />
            <TextField
              size="small"
              label={'Preço venda'}
              autoComplete="off"
            />
          </Box>
          <Button variant={'contained'}>Cadastrar</Button>
        </Box>
      </Box>
    </Box>
  );
}
