import { Card } from '@mui/material';
import { useState } from 'react';

import ProductInfos from './ProductInfos';
import CustomAutocomplete from '../CaixaInput/GenericAutocomplete';
import { InfoCard } from '../../../../pages/caixa/CaixaPageStyles';
import { IndicationService } from 'shared/services/api/indication/IndicationService';
import { ClienteService } from 'shared/services';
import { CollaboratorService } from 'shared/services/api/colab';
import { ISendPagination } from 'shared/models/client';
import { dataOneIndication } from 'shared/models/indication';

export default function CaixaInfos() {
  const [indication, setIndication] = useState<any | null>(null);
  const [cliente, setCliente] = useState<any | null>(null);
  const [vendedor, setVendedor] = useState<any | null>(null);

  const changeIndication = (value: dataOneIndication | null) => {
    setIndication(value);
  };

  function handleIndication(conf: ISendPagination) {
    return IndicationService.getAllIndicacoes(conf);
  }

  const changeCliente = (value: dataOneIndication | null) => {
    setIndication(value);
  };

  function handleCliente(conf: ISendPagination) {
    return ClienteService.getAll(conf);
  }

  return (
    <InfoCard disableGutters>
      <ProductInfos />
      <Card
        sx={{
          padding: '0.5em',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <CustomAutocomplete<dataOneIndication>
          label="Indicação"
          placeholder="Digite alguma indicação"
          fetchOptions={handleIndication}
          onUpdateValue={changeIndication}
        />
        <CustomAutocomplete<dataOneIndication>
          label="Cliente"
          placeholder="Procurar cliente"
          fetchOptions={handleCliente}
          onUpdateValue={changeCliente}
        />
      </Card>
    </InfoCard>
  );
}
