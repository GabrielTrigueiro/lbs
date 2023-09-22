import { Typography, Box } from '@mui/material';

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
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        { value ? Dinheiro ? 'R$ ' + Number(value).toFixed(2) : value : ''}
      </Typography>
    </Box>
  );
}
