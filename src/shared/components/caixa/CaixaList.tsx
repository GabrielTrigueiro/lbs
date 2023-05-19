import { Box, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography } from "@mui/material";

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
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const CaixaList = () => {
  return (
    <div className="bg-white flex-grow flex flex-col">
      <div className="flex-grow max-h-full">
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
      <div className="bg-neutral-500 flex h-16 text-black">
        <div
          className="
            transition
            cursor-pointer
          bg-yellow-300
          border-black
          hover:bg-white
            hover:text-black
            flex
            items-center
            justify-center
            m-2
            p-3
            rounded-lg
          "
        >
          <Typography>Cancelar</Typography>
        </div>
        <div
          className="
            flex
            flex-grow 
            justify-end 
            items-center
            px-5
          "
        >
          <Typography color={"#fff"}>Venda: valor total</Typography>
        </div>
      </div>
    </div>
  )
}