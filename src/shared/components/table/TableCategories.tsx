import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ICategory } from '../../models/categories';
import { CategoryTableSubMenu } from '../category-submenu/CategorySubMenu';
import { CustomTableRow, TableCellStyled, TableStyled } from './TableStyles';

export const TableCategories: React.FC<{
  lista: ICategory[];
  update: () => void;
}> = ({ lista, update }) => {
  return (
    <TableContainer>
      <TableStyled sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Nome</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Código</TableCell>
            <TableCell sx={{ color: '#8e8e8e' }}>Descrição</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {lista.map((row, index) => (
            <CustomTableRow key={row.id} sx={{ boxShadow: 'inherit' }}>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {index + 1}
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {row.name}
              </TableCellStyled>
              <TableCellStyled sx={{ fontWeight: '500' }}>
                {row.code}
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
                <CategoryTableSubMenu update={update} categoria={row} />
              </TableCellStyled>
            </CustomTableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>
  );
};
