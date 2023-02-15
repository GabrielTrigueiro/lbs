import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IInfoClient, RegisterClient } from "../../models/client";
import { TableSubMenu } from "../client-submenu/TableSubMenu";
import "../../../styles/Client/ClientTable.css";

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
  borderEndEndRadius: "10px",
});
const TableCellStyled = styled(TableCell)({
  borderColor: "transparent",
  padding: "10px 16px",
});


export const TableClients: React.FC<{
  lista: RegisterClient[];
  update: () => void;
}> = ({ lista, update }) => {

  return (
    <TableContainer className="table-container">
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCellStyled></TableCellStyled>
            <TableCellStyled sx={{color: '#8e8e8e'}}>Informações Básicas</TableCellStyled>
            <TableCellStyled sx={{color: '#8e8e8e'}}>Número de Celular</TableCellStyled>
            <TableCellStyled sx={{color: '#8e8e8e'}}>CPF</TableCellStyled>
          </TableRow>
        </TableHead>
     
          <TableBody>
            {lista.map((row) => (
              <TableRowStyled key={row.id} sx={{ boxShadow: "inherit" }}>
                <TableCellStyled style={{ borderLeftColor: row.isActive ? "#42FF00" : "#FF5555" }} sx={{ width: 30, mr: "15px" }}>
                  <Avatar/>
                </TableCellStyled>
                <TableCellStyled>
                    <Box display="flex">
                      <Box>
                        <Box sx={{fontWeight:'500'}}>{row.name}</Box>
                        <Box sx={{color:'#575a61', fontSize:'12px'}}>{row.email}</Box>
                      </Box>
                    </Box>
                </TableCellStyled>
                <TableCellStyled sx={{fontWeight:'500'}}>{row.cell}</TableCellStyled>
                <TableCellStyled sx={{fontWeight:'500'}}>{row.cpf}</TableCellStyled>
                <TableCellStyled sx={{display: "flex", justifyContent: "flex-end", alignContent:"center"}}>
                  <TableSubMenu update={update} cliente={row}/>
                </TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
