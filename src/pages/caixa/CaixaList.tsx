import {Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography} from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export const CaixaList = () => {
  return(
    <Box
      sx={{
        background:"#fff",
        display:"grid",
        gridTemplateRows:"1fr 5em"
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{borderBotton:"2px solid #000"}}>
            <TableRow>
              <TableCell>IMG</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Valor Unitário</TableCell>
              <TableCell align="right">Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box color={"#fff"} sx={{background:"#A6A6A6", display:"grid", gridTemplateColumns:"7em 1fr"}}>
        <Box sx={{background:"#FC3333", display:"flex"}}>
          <Typography margin={"auto"}>Cancelar</Typography>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
          <Typography>Venda</Typography><Typography sx={{marginRight:"1em"}}>"valortotal"</Typography>
        </Box>
      </Box>
    </Box>
  )
}