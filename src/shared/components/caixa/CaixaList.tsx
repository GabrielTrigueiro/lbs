import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography, Button } from "@mui/material";

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
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

export const CaixaList = () => {
  return (
    <div
      className="
        grow
        flex
        flex-col
        flex-none
      "
    >
      <div
        className="
          bg-white
          grow
          h-[70vh]
          overflow-y-auto
        "
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead sx={{ borderBotton: "2px solid #000" }}>
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
      </div>
      <div
        className="
          bg-neutral-500
           flex
           h-16
           text-black
           items-center
           px-2
           rounded-b-lg
          "
      >
        <Button sx={{ height: "80%" }} variant="contained">Cancelar</Button>
        <div
          className="
            flex
            flex-grow 
            justify-end 
            items-center
          "
        >
          <Typography color={"#fff"}>Venda: valor total</Typography>
        </div>
      </div>
    </div>
  )
}