import styled from "@emotion/styled";
import { Table, TableRow, TableCell, Avatar, Box, TableBody, TableContainer, TableHead } from "@mui/material";
import { IDataProduct } from "../../../models/product";
import { TableSubMenu } from "../../client-submenu/TableSubMenu";
import "../../../../styles/Client/ClientTable.css";

interface props {
    lista: IDataProduct[];
    update: () => void;
}

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
    borderLeftColo: "#42FF00"
});

export const TableProductList: React.FC<props> = ({ lista, update }) => {

    return (
        <TableContainer className="table-container">
            <TableStyled sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <TableCellStyled></TableCellStyled>
                        <TableCellStyled sx={{ color: '#8e8e8e' }}>Produto</TableCellStyled>
                        <TableCellStyled sx={{ color: '#8e8e8e' }}>Venda</TableCellStyled>
                        <TableCellStyled sx={{ color: '#8e8e8e' }}>Etiqueta</TableCellStyled>
                        <TableCellStyled sx={{ color: '#8e8e8e' }}>Quantidade</TableCellStyled>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {lista.map((row) => (
                        <TableRowStyled key={row.id} sx={{ boxShadow: "inherit" }}>
                            <TableCellStyled style={{ borderLeftColor: row.quantidade <= 20 ? "##FAE100" : "#FF5555" }} sx={{ width: 30, mr: "15px" }}>
                                <Avatar />
                            </TableCellStyled>
                            <TableCellStyled>
                                <Box display="flex">
                                    <Box>
                                        <Box sx={{ fontWeight: '500' }}>{row.name}</Box>
                                        <Box sx={{ color: '#575a61', fontSize: '12px' }}>{row.codeInt}</Box>
                                    </Box>
                                </Box>
                            </TableCellStyled>
                            <TableCellStyled sx={{ fontWeight: '500' }}>{row.salerPrice}</TableCellStyled>
                            <TableCellStyled sx={{ fontWeight: '500' }}>{row.tagPrice}</TableCellStyled>
                            <TableCellStyled sx={{ fontWeight: '500' }}>{row.quantidade}</TableCellStyled>
                            <TableCellStyled sx={{ display: "flex", justifyContent: "flex-end", alignContent: "center" }}>
                                {/* <TableSubMenu update={update} cliente={row} /> */}
                            </TableCellStyled>
                        </TableRowStyled>
                    ))}
                </TableBody>
            </TableStyled>
        </TableContainer>
    )
}