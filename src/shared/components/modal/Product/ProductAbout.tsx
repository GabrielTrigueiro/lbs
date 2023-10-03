import {Box, Button, Skeleton, TextField} from '@mui/material';
import React from 'react';
import {IProductInformation} from "../../../models/product";
import {AboutFields, AboutForm, RegisterContainer, ValueFields, ValueForm} from "./ModalStyles";
import InformationsGrid from "./InformationsGrid";

interface IProductAbout {
  informacoes: IProductInformation[];
  changeInformacoes: React.Dispatch<React.SetStateAction<IProductInformation[]>>;
}
export const ProductAbout = ({informacoes, changeInformacoes}: IProductAbout) => {
  return (
    <RegisterContainer sx={{gap: 1}}>
      <AboutForm sx={{ gap: 1}}>
        <Skeleton
          variant="rectangular"
          sx={{
            minWidth: 230,
            minHeight: 230,
            borderRadius: 1,
          }}
        />
        <AboutFields sx={{gap: 1}}>
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
        </AboutFields>
      </AboutForm>

      <Box sx={{height: 250, display: 'flex', gap: 1}}>
        <Box sx={{display: 'flex', flexDirection: "column", gap: 1}}>
          <InformationsGrid informacoes={informacoes} changeInformacoes={changeInformacoes}/>
          <Button variant={'contained'}>Adicionar informação</Button>
        </Box>
        <ValueForm>
          <ValueFields sx={{gap: 1}}>
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
          </ValueFields>
          <Button variant={'contained'}>Cadastrar</Button>
        </ValueForm>
      </Box>
    </RegisterContainer>
  );
}
