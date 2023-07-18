import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { dataOneIndication } from '../../models/indication';
import { IndicationTableSubMenu } from '../indication-submenu/IndicationTableSubMenu';
import { CustomTableRow, TableCellStyled, TableStyled } from './TableStyles';
import { TableCell } from '@mui/material';

export const TableIndications: React.FC<{
  lista: dataOneIndication[];
  update: () => void;
}> = ({ lista, update }) => {
  return (
    <TableContainer>
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#8e8e8e' }}>Tipo</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Descrição</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lista.map((row, index) => (
            <CustomTableRow key={row.id} sx={{ boxShadow: 'inherit' }}>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {row.type}
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {row.description}
              </TableCellStyled>
              <TableCellStyled
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignContent: 'center',
                }}
              >
                <IndicationTableSubMenu update={update} indicacao={row} />
              </TableCellStyled>
            </CustomTableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
