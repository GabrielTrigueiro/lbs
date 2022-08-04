import styled from "@emotion/styled";
import { IInfoProvider } from "../../services/api/providers/ProviderService";
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Avatar,
  Box,
} from "@mui/material";
import { ProvidersSubMenu } from "./ProvidersSubMenu";


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

export const TableProviders: React.FC<{
  lista: IInfoProvider[];
  update: () => void;
}> = ({ lista, update }) => {
  return (
    <TableContainer className="table-container">
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCellStyled></TableCellStyled>
            <TableCellStyled sx={{ color: "#8e8e8e" }}>
              Informações Básicas
            </TableCellStyled>
            <TableCellStyled sx={{ color: "#8e8e8e" }}>
              Número de Celular
            </TableCellStyled>
            <TableCellStyled sx={{ color: "#8e8e8e" }}>CNPJ</TableCellStyled>
          </TableRow>
        </TableHead>
        <TableBody>
          {lista.map((row) => (
            <TableRowStyled
              key={row.id}
              sx={{ boxShadow: "inherit" }}
              className="MuiTableRow-root"
            >
              <TableCellStyled
                sx={{ width: 30, mr: "15px" }}
              >
                <Avatar />
              </TableCellStyled>
              <TableCellStyled>
                <Box display="flex">
                  <Box>
                    <Box sx={{ fontWeight: "500" }}>{row.name}</Box>
                    <Box sx={{ color: "#575a61", fontSize: "12px" }}>
                      {row.email}
                    </Box>
                  </Box>
                </Box>
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: "500" }}>
                {row.cell}
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: "500" }}>
                {row.cnpj}
              </TableCellStyled>
              <TableCellStyled
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "center",
                }}
              >
                <ProvidersSubMenu update={update} provider={row} />
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
