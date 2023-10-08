import { Card } from '@mui/material';
import { useState } from 'react';

import CustomAutocomplete from '../CaixaInput/CustomAutocomplete';
import { IndicationService } from 'shared/services/api/indication/IndicationService';
import { ClienteService } from 'shared/services';
import { CollaboratorService } from 'shared/services/api/colab';
import { IInfoClient, ISendPagination } from 'shared/models/client';
import { dataOneIndication } from 'shared/models/indication';
import { IColab } from 'shared/models/colab';
import { useCaixaContext } from '../../../contexts/CaixaContext';

export default function CaixaEntities() {
  const {
    indicacao,
    cliente,
    vendedor,
    setCliente,
    setIndicacao,
    setVendedor,
  } = useCaixaContext();

  const changeIndication = (value: dataOneIndication | undefined) => {
    setIndicacao(value);
  };
  const changeCliente = (value: IInfoClient | undefined) => {
    setCliente(value);
  };
  const changeVendedor = (value: IColab | undefined) => {
    setVendedor(value);
  };

  function handleIndication(conf: ISendPagination) {
    return IndicationService.getAllIndicacoes(conf);
  }

  function handleCliente(conf: ISendPagination) {
    return ClienteService.getAll(conf);
  }

  function handleVendedor() {
    return CollaboratorService.getColaboradores();
  }

  return (
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
        size="small"
      />
      <CustomAutocomplete<IInfoClient>
        label="Cliente"
        placeholder="Procurar cliente"
        fetchOptions={handleCliente}
        onUpdateValue={changeCliente}
        size="small"
      />
      <CustomAutocomplete<IColab>
        label="Vendedor"
        placeholder="Procurar vendedor"
        fetchOptions={handleVendedor}
        onUpdateValue={changeVendedor}
        size="small"
      />
    </Card>
  );
}
