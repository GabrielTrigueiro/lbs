import { Box, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import 'styles/Client/ClientTable.css';
import { IProviderCadastroInfo } from '../../models/provider';
import { ProviderSubMenu } from '../provider-submenu/ProviderSubmenu';
import { TableStyled, CustomTableRow, TableCellStyled } from './TableStyles';

export const TableProviders: React.FC<{
  lista: IProviderCadastroInfo[];
  update: () => void;
}> = ({ lista, update }) => {
  return (
    <TableContainer className="table-container">
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Informações Básicas</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Número Celular</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>CNPJ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lista.map((row, index) => (
            <CustomTableRow key={row.id} sx={{ boxShadow: 'inherit' }}>
              <TableCellStyled sx={{ width: 30, mr: '15px' }}>
                <Typography></Typography>
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
                {row.telephone}
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {row.cnpj}
              </TableCellStyled>
              <TableCellStyled
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignContent: 'center',
                }}
              >
                <ProviderSubMenu update={update} fornecedor={row} />
              </TableCellStyled>
            </CustomTableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
