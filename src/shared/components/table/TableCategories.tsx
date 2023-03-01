import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { IndicationTableSubMenu } from "../indication-submenu/IndicationTableSubMenu";
import { ICategoryRegister } from "../../models/categories";

const TableStyled = styled(Table)({
  borderSpacing: "0px 8px",
  borderCollapse: "separate",
  thead: {
    borderSpacing: 0,
  },
});
const TableRowStyled = styled(TableRow)({
  padding: "10px",
  backgroundColor: "#fff",
});
const TableCellStyled = styled(TableCell)({
  borderColor: "transparent",
  padding: "10px 16px",
});


export const TableCategories: React.FC<{lista: ICategoryRegister[]; update: () => void;}> = ({ lista, update }) => {

  return (
    <TableContainer>
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCellStyled></TableCellStyled>
            <TableCellStyled sx={{color: '#8e8e8e'}}>Nome</TableCellStyled>
            <TableCellStyled sx={{color: '#8e8e8e'}}>Código</TableCellStyled>
            <TableCellStyled sx={{color: '#8e8e8e'}}>Descrição</TableCellStyled>
          </TableRow>
        </TableHead>
     
          <TableBody>
            {lista.map((row, index ) => (
              <TableRowStyled key={row.id} sx={{ boxShadow: "inherit" }}>
                <TableCellStyled sx={{fontWeight:'500'}}>{index + 1}</TableCellStyled>
                <TableCellStyled sx={{fontWeight:'500'}}>{row.name}</TableCellStyled>
                <TableCellStyled sx={{fontWeight:'500'}}>{row.code}</TableCellStyled>
                <TableCellStyled sx={{fontWeight:'500'}}>{row.description}</TableCellStyled>
                <TableCellStyled sx={{display: "flex", justifyContent: "flex-end", alignContent:"center"}}>
                {/* <IndicationTableSubMenu update={update} indicacao={row}/>            */}
                </TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
