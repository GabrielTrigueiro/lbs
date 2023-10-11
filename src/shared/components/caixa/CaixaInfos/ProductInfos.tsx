import Skeleton from '@mui/material/Skeleton';
import { Card, Box } from '@mui/material';
import Info from './Info';
import { useCaixaContext } from '../../../contexts/CaixaContext';

export default function ProductInfos() {
  const { ultimoProduto } = useCaixaContext();
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
        <Info label="Código: " value={ultimoProduto?.produto?.codeBarras} />
        <Info
          label="Valor: "
          value={ultimoProduto?.produto?.salerPrice}
          Dinheiro
        />
        <Info label="Descrição:" value={ultimoProduto?.produto?.name} />
      </Box>
    </Card>
  );
}
