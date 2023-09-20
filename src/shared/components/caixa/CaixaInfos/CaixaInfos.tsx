import ProductInfos from './ProductInfos';
import { InfoCard } from '../../../../pages/caixa/CaixaPageStyles';
import CaixaEntities from './CaixaEntities';
import { Card } from '@mui/material';

export default function CaixaInfos() {
  return (
    <InfoCard disableGutters>
      <ProductInfos />
      <CaixaEntities />
      <Card sx={{ display: 'flex', flexGrow: 1, padding: '0.5em' }}>
        oi texte
      </Card>
    </InfoCard>
  );
}
