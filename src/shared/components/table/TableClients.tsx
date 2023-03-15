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

  function formatarDocumento(doc: string) {
    // remove todos os caracteres não numéricos
    doc = doc.replace(/\D/g, '');

    // verifica o tipo de documento (CPF ou CNPJ)
    if (doc.length === 11) {
        // formata CPF: 999.999.999-99
        doc = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (doc.length === 14) {
        // formata CNPJ: 99.999.999/9999-99
        doc = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return doc;
}

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
                <TableCellStyled sx={{fontWeight:'500'}}>{row.cell.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")}</TableCellStyled>
                <TableCellStyled sx={{fontWeight:'500'}}>{formatarDocumento(row.cpf)}</TableCellStyled>
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
