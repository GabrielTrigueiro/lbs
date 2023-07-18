import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegisterClient } from '../../models/client';
import { TableSubMenu } from '../client-submenu/TableSubMenu';
import { TableStyled, TableCellStyled, CustomTableRow } from './TableStyles';
import { statusErro, statusPositivo } from 'styles/variables';

const getBorderColor = (status: string | undefined) => {
  if (status === 'true') return status ? statusPositivo : statusErro;
  else return statusErro;
};
const StatusTableRow = styled(CustomTableRow)<{ status: string | undefined }>`
  td:first-of-type {
    border-left: 6px solid ${(props) => getBorderColor(props.status)};
  }
`;

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
      doc = doc.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }
    return doc;
  }

  return (
    <TableContainer className="table-container">
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Informações Básicas</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Número de Celular</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>CPF</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lista.map((row) => (
            <StatusTableRow
              status={row.isActive?.toString()}
              key={row.id}
              sx={{ boxShadow: 'inherit' }}
            >
              <TableCellStyled sx={{ width: 30, mr: '15px' }}>
                <Avatar />
              </TableCellStyled>
              <TableCellStyled>
                <Box display="flex">
                  <Box>
                    <Box sx={{ fontWeight: '500' }}>{row.name}</Box>
                    <Box sx={{ color: '#575a61', fontSize: '12px' }}>
                      {row.email}
                    </Box>
                  </Box>
                </Box>
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {row.cell.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')}
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {formatarDocumento(row.cpf)}
              </TableCellStyled>
              <TableCellStyled
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignContent: 'center',
                }}
              >
                <TableSubMenu update={update} cliente={row} />
              </TableCellStyled>
            </StatusTableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
