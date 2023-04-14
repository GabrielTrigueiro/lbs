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

const TableCellStyled = styled(TableCell)({
    borderColor: "transparent",
    padding: "10px 16px",
    backgroundColor: "#fff"
});

export const TableProductList: React.FC<props> = ({ lista, update }) => {
    return (
        <TableContainer className="table-container">
            <TableStyled sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{ color: '#8e8e8e' }}>Produto</TableCell>
                        <TableCell sx={{ color: '#8e8e8e' }}>Venda</TableCell>
                        <TableCell sx={{ color: '#8e8e8e' }}>Etiqueta</TableCell>
                        <TableCell sx={{ color: '#8e8e8e' }}>Quantidade</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {lista.map((row, index) => (
                        <TableRow key={index}>
                            <TableCellStyled></TableCellStyled>
                            <TableCellStyled sx={{ color: '#8e8e8e' }}>{row.name}</TableCellStyled>
                            <TableCellStyled sx={{ color: '#8e8e8e' }}>{row.salerPrice}</TableCellStyled>
                            <TableCellStyled sx={{ color: '#8e8e8e' }}>{row.tagPrice}</TableCellStyled>
                            <TableCellStyled sx={{ color: '#8e8e8e' }}>{row.quantidade}</TableCellStyled>
                        </TableRow>
                    ))}
                </TableBody>
            </TableStyled>
        </TableContainer>
    )
}