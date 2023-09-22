import ProductInfos from './ProductInfos';
import { InfoCard } from '../../../../pages/caixa/CaixaPageStyles';
import CaixaEntities from './CaixaEntities';
import { Button } from '@mui/material';
import CaixaPayment from "./CaixaPayment";
import {useCaixaContext} from "../../../contexts/CaixaContext";

export default function CaixaInfos() {
  const {finalizarCompra} = useCaixaContext()
  return (
    <InfoCard disableGutters>
      <ProductInfos />
      <CaixaEntities />
      <CaixaPayment/>
      <Button onClick={finalizarCompra} variant="contained">Finalizar compra</Button>
    </InfoCard>
  );
}
