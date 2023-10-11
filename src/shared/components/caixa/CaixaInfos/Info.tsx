import { Typography, Box } from '@mui/material';
import { transformNumberToBr } from '../CaixaList/CaixaList';

interface InfoProps {
  label: string;
  value: string | undefined | number;
  Dinheiro?: boolean;
}

export default function Info({ Dinheiro = false, label, value }: InfoProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontWeight: 'bold', marginRight: 0.5 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {value ? (Dinheiro ? 'R$ ' + transformNumberToBr(value) : value) : ''}
      </Typography>
    </Box>
  );
}
