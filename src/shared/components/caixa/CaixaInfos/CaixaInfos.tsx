import { Button } from '@mui/material';
import { useCallback, useState } from 'react';

import { ImagemProduto } from './CaixaInfosStyles';
import Info from './Info';
import { useCaixaContext } from 'shared/contexts/CaixaContext';
import { IndicationService } from 'shared/services/api/indication/IndicationService';
import { CustomSelect } from '../CaixaInput/CaixaInputStyles';
import { ClienteService } from 'shared/services';
import { CollaboratorService } from 'shared/services/api/colab';
import { PaymentService } from 'shared/services/api/payment';

export default function CaixaInfos() {
  const {
    ultimoProduto,
    setClientId,
    setIndicationId,
    finalizarCompra,
    setTypePaymentId,
    setSellerId,
    valuePayment,
  } = useCaixaContext();

  const [indicacao, setIndicacao] = useState('');
  const [cliente, setClient] = useState('');

  const getIndicacoes = useCallback(async () => {
    let search = {
      page: 0,
      pageSize: 5,
      param: 'name',
      sortDirection: 'DESC',
      sortField: 'name',
      value: indicacao,
    };
    const resp = await IndicationService.getAllIndicacoes(search);
    return resp.data.data;
  }, [indicacao]);

  const getClientes = useCallback(async () => {
    let search = {
      page: 0,
      pageSize: 5,
      param: 'name',
      sortDirection: 'DESC',
      sortField: 'name',
      value: cliente,
    };
    const resp = await ClienteService.getAll(search);
    return resp.data.data;
  }, [cliente]);

  const getVendedor = useCallback(async () => {
    const resp = await CollaboratorService.getColaboradores();
    return resp.data.data;
  }, []);

  const getPaymentTypes = useCallback(async () => {
    const resp = await PaymentService.getFormasDePagamento();
    return resp.data.data;
  }, []);

  return (
    <>
      <div className="bg-white flex flex-col items-center p-1">
        <ImagemProduto>imagem</ImagemProduto>
        <div className="w-full grid grid-cols-2 gap-2 p-3 mt-1">
          <Info label="Código" value={ultimoProduto?.produto?.codeBarras} />
          <Info label="Descrição" value={ultimoProduto?.produto?.description} />
          <Info
            label="Valor"
            Dinheiro
            value={ultimoProduto?.produto?.salerPrice}
          />
        </div>
      </div>

      {/* infos da compra */}
      <div className="bg-white flex gap-2 p-1 flex-col">
        <CustomSelect
          placeholder="Indicação"
          isClearable
          cacheOptions
          loadOptions={getIndicacoes}
          formatOptionLabel={(option: any) => (
            <div onClick={() => setIndicationId(option.id)}>{option.type}</div>
          )}
        />
        <CustomSelect
          placeholder="Cliente"
          isClearable
          cacheOptions
          loadOptions={getClientes}
          formatOptionLabel={(option: any) => (
            <div onClick={() => setClientId(option.id)}>{option.name}</div>
          )}
        />
        <CustomSelect
          placeholder="Vendedor"
          isClearable
          cacheOptions
          loadOptions={getVendedor}
          formatOptionLabel={(option: any) => (
            <div onClick={() => setSellerId(option.id)}>{option.name}</div>
          )}
        />
      </div>

      {/* pagamentos */}
      <div className="flex-grow grid grid-row-3">
        <div className="bg-neutral-500 text-white flex items-center px-2">
          Saldo a pagar: R$ {valuePayment}
        </div>
        <div className="bg-white flex items-center justify-center">
          <CustomSelect
            placeholder="Forma de pagamento"
            isClearable
            cacheOptions
            loadOptions={getPaymentTypes}
            formatOptionLabel={(option: any) => (
              <div onClick={() => setTypePaymentId(option.id)}>
                {option.name}
              </div>
            )}
          />
        </div>
        <div className="bg-neutral-500 text-white flex items-center px-2">
          Desconto: R$ % ####
        </div>
      </div>

      {/* finalizar */}
      <div className="bg-neutral-500 h-fit flex items-center justify-between p-2 text-white">
        Valor a ser pago: R$
        <Button onClick={() => finalizarCompra()} variant="contained">
          Confirmar
        </Button>
      </div>
    </>
  );
}
