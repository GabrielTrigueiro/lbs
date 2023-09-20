import Skeleton from '@mui/material/Skeleton';
import { Card, Typography, Box } from '@mui/material';
import Info from './Info';

export default function ProductInfos() {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          minWidth: 100,
          minHeight: 100,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          overflow: 'hidden',
          padding: '0 0.5em',
          width: '100%',
          height: '100%',
        }}
      >
        <Info label="Código: " value={23} />
        <Info label="Valor: " value={23} Dinheiro />
        <Info label="Descrição:" value={'dmasdmsaldmsakdm'} />
      </Box>
    </Card>
  );
}
