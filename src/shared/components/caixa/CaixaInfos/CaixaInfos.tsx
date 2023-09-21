import ProductInfos from './ProductInfos';
import { InfoCard } from '../../../../pages/caixa/CaixaPageStyles';
import CaixaEntities from './CaixaEntities';
import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { PaymentService } from 'shared/services/api/payment';
import { Payment } from 'shared/models/payment';
import CustomAutocomplete from '../CaixaInput/GenericAutocomplete';

export default function CaixaInfos() {
  const [pagamento, setPagamento] = useState<any | null>(null);

  const changePagamento = (value: Payment | null) => {
    setPagamento(value);
  };
  function handleVendedor() {
    return PaymentService.getFormasDePagamento();
  }
  return (
    <InfoCard disableGutters>
      <ProductInfos />
      <CaixaEntities />
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          padding: '0.5em',
        }}
      >
        <CustomAutocomplete
          label="Forma de pagamento"
          placeholder="Procurar forma de pagamento"
          fetchOptions={handleVendedor}
          onUpdateValue={changePagamento}
        />
      </Card>
    </InfoCard>
  );
}
