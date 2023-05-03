import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import { Caixa, CaixaContainer, Infos } from "./CaixaComponents";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useState} from "react";
import {CodeImputField} from "./CodeImputField";
import {CaixaList} from "./CaixaList";

export const CaixaPage = () => {

  return(
    <CaixaContainer>
      <Caixa>
        <CodeImputField/>
        <CaixaList/>
      </Caixa>
      <Infos>
        <Box sx={{background:"#fff"}}>1</Box>
        <Box sx={{background:"#fff"}}>2</Box>
        <Box sx={{background:"#fff"}}>
          Formas de pagamento
        </Box>
        <Box sx={{background:"#fff"}}>
          Valor final e confirmar
        </Box>
      </Infos>
    </CaixaContainer>
  )
}