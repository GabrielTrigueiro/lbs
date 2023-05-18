import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import {CodeImputField} from "./CodeImputField";
import {CaixaList} from "./CaixaList";

export const CaixaPage = () => {

  return(
    <div>
      <div>
        <CodeImputField/>
        <CaixaList/>
      </div>
      <div>
        <Box sx={{background:"#fff"}}>1</Box>
        <Box sx={{background:"#fff"}}>2</Box>
        <Box sx={{background:"#fff"}}>
          Formas de pagamento
        </Box>
        <Box sx={{background:"#fff"}}>
          Valor final e confirmar
        </Box>
      </div>
    </div>
  )
}