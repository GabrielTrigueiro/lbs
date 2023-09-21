import ProductInfos from './ProductInfos';
import { InfoCard } from '../../../../pages/caixa/CaixaPageStyles';
import CaixaEntities from './CaixaEntities';
import { Button } from '@mui/material';
import CaixaPayment from "./CaixaPayment";

export default function CaixaInfos() {

  return (
    <InfoCard disableGutters>
      <ProductInfos />
      <CaixaEntities />
      <CaixaPayment/>
      <Button variant="contained">Finalizar compra</Button>
    </InfoCard>
  );
}
