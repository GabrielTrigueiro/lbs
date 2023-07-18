import styled from '@emotion/styled';
import { Table, TableCell, TableRow } from '@mui/material';
import { statusProduto } from 'shared/models/product';
import { statusAviso, statusErro, statusPositivo } from 'styles/variables';

export const getBorderColor = (status: statusProduto) => {
  if (status === 'EM_ESTOQUE') {
    return statusPositivo;
  }
  if (status === 'ULT_UNIDADES') {
    return statusAviso;
  }
  if (status === 'FALTANDO') {
    return statusErro;
  }
};

export const CustomTableRow = styled(TableRow)`
  td:first-of-type {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  td:last-of-type {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const TableStyled = styled(Table)({
  borderSpacing: '0px 8px',
  borderCollapse: 'separate',
  thead: {
    borderSpacing: 0,
  },
});

export const TableCellStyled = styled(TableCell)({
  borderColor: 'transparent',
  padding: '10px 16px',
  backgroundColor: '#fff',
});
