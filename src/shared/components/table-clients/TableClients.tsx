import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./styles.css"
import { Typography } from '@mui/material';


const TableStyled = styled(Table)({
  fontWeight:'bold',
 borderSpacing: "0px 8px",
 borderCollapse: "separate",
 'thead': {
  borderSpacing: 0,
}
 
});

const TableBodyStyled = styled(TableBody)({
  fontWeight:'bold',
});

const TableHeaderStyled = styled(TableHead)({
  fontWeight:'bold',
});
const TableRowStyled = styled(TableRow)({
  fontWeight:'bold',
  padding:"10px",
  backgroundColor:"#f1f1f1",
  borderEndEndRadius:"10px",
  
});

const TableCellStyled = styled(TableCell)({
  fontWeight:'bold',
  borderColor: "transparent",
  padding: "10px 16px"
});


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

export const TableClients: React.FC = () => {

  return (
    <TableContainer  >
    <TableStyled sx={{ minWidth: 700 }} aria-label="customized table" >
      <TableHeaderStyled>
        <TableRow>
          <TableCellStyled>Informações Basicas</TableCellStyled>
          <TableCellStyled align="right">Numero Celular</TableCellStyled>
          <TableCellStyled align="right">CPF</TableCellStyled>
        </TableRow>
      </TableHeaderStyled>
      <TableBodyStyled>
        
        {rows.map((row) => (
          <TableRowStyled  key={row.name} className="MuiTableRow-root" >
            <TableCellStyled scope="row">
                <Typography>
                {row.name}
                <Typography sx={{fontSize: "10px"}}>
                {row.name}
                </Typography>
                </Typography>
            </TableCellStyled>
            <TableCellStyled align="right">{row.calories}</TableCellStyled>
            <TableCellStyled align="right">{row.fat}</TableCellStyled>
          </TableRowStyled>
        ))}
      </TableBodyStyled>
    </TableStyled>
  </TableContainer>
  );
};
