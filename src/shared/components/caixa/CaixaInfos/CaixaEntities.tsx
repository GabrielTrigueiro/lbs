import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CustomAutocomplete from '../CaixaInput/CustomAutocomplete';
import { IndicationService } from 'shared/services/api/indication/IndicationService';
import { ClienteService } from 'shared/services';
import { CollaboratorService } from 'shared/services/api/colab';
import { IInfoClient, ISendPagination } from 'shared/models/client';
import { dataOneIndication } from 'shared/models/indication';
import { IColab } from 'shared/models/colab';
import { useCaixaContext } from '../../../contexts/CaixaContext';

export default function CaixaEntities() {
  const { cliente, vendedor, setCliente, setVendedor } = useCaixaContext();

  const handleCliente = useCallback((conf: ISendPagination) => {
    return ClienteService.getAll(conf);
  }, []);

  const handleVendedor = useCallback(() => {
    return CollaboratorService.getColaboradores();
  }, []);

  useEffect(() => {}, [cliente, vendedor]);

  return (
    <Card
      sx={{
        padding: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <CustomAutocomplete<IInfoClient>
        label="Cliente"
        placeholder="Procurar cliente"
        fetchOptions={handleCliente}
        onUpdateValue={setCliente}
        size="small"
      />
      <CustomAutocomplete<IColab>
        label="Vendedor"
        placeholder="Procurar vendedor"
        fetchOptions={handleVendedor}
        onUpdateValue={setVendedor}
        size="small"
      />
    </Card>
  );
}
