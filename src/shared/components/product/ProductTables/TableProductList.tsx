import styled from '@emotion/styled';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  CustomTableRow,
  TableCellStyled,
  TableStyled,
  getBorderColor,
} from 'shared/components/table/TableStyles';
import 'styles/Client/ClientTable.css';
import { IDataProduct, statusProduto } from '../../../models/product';
import { ProductSubMenu } from '../productSubMenu/ProductSubMenu';

interface props {
  lista: IDataProduct[];
  update: () => void;
}

const StatusTableRow = styled(CustomTableRow)<{ status: statusProduto }>`
  td:first-of-type {
    border-left: 6px solid ${(props) => getBorderColor(props.status)};
  }
`;
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
            <TableCell sx={{ color: '#8e8e8e' }}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lista.map((row, index) => (
            <StatusTableRow status={row.status} key={index}>
              <TableCellStyled></TableCellStyled>
              <TableCellStyled sx={{ color: '#8e8e8e' }}>
                {row.name}
              </TableCellStyled>
              <TableCellStyled sx={{ color: '#8e8e8e' }}>
                {row.salerPrice}
              </TableCellStyled>
              <TableCellStyled sx={{ color: '#8e8e8e' }}>
                {row.tagPrice}
              </TableCellStyled>
              <TableCellStyled sx={{ color: '#8e8e8e' }}>
                {row.quantity}
              </TableCellStyled>
              <TableCellStyled sx={{ color: '#8e8e8e' }}>
                <ProductSubMenu product={row} update={update} />
              </TableCellStyled>
            </StatusTableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
