import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./styles.css";
import { Avatar, Box } from "@mui/material";
import MenuCliente from "./MenuCliente";
import { useEffect, useState } from "react";
import { ClienteService, IListagemBaseInfoClient } from "../../services/api/client/ClientService";

const TableStyled = styled(Table)({
  fontWeight: "bold",
  borderSpacing: "0px 8px",
  borderCollapse: "separate",
  thead: {
    borderSpacing: 0,
  },
});
const TableBodyStyled = styled(TableBody)({
  fontWeight: "bold",
});
const TableHeaderStyled = styled(TableHead)({
  fontWeight: "bold",
});
const TableRowStyled = styled(TableRow)({
  fontWeight: "bold",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  borderEndEndRadius: "10px",
});
const TableCellStyled = styled(TableCell)({
  fontWeight: "bold",
  borderColor: "transparent",
  padding: "10px 16px",
});

export const TableClients: React.FC = () => {
  
  const [rows, setRows] = useState<IListagemBaseInfoClient[]>([])  

  useEffect(()=>{
    ClienteService.getAll()
    .then((result)=>{
      if(result instanceof Error){
        alert(result.message)
      } else{
        setRows(result.data.data)
      }
    })
  },[])
 
  return (
    <TableContainer>
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHeaderStyled>
          <TableRow>
            <TableCellStyled></TableCellStyled>
            <TableCellStyled>Informações Básicas</TableCellStyled>
            <TableCellStyled>Número de Celular</TableCellStyled>
            <TableCellStyled>CPF</TableCellStyled>
          </TableRow>
        </TableHeaderStyled>
        <TableBodyStyled>
          {rows.map(row => (
            <TableRowStyled key={row.id}
              sx={{ boxShadow: "inherit" }}
              className="MuiTableRow-root"
            >
              <TableCellStyled
                // style={{ borderLeftColor: row.status? "#42FF00" : "#FF5555" }}
                sx={{ width: 30, mr: "15px" }}
              >
                <Avatar />
              </TableCellStyled>
              <TableCellStyled>
                <Box display="flex">
                  <div>
                    {row.name}
                    <div>{row.email}</div>
                  </div>
                </Box>
              </TableCellStyled>
              <TableCellStyled>{row.cell}</TableCellStyled>
              <TableCellStyled>{row.cpf}</TableCellStyled>
              <TableCellStyled
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <MenuCliente />
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBodyStyled>
      </TableStyled>
    </TableContainer>
  );
};
