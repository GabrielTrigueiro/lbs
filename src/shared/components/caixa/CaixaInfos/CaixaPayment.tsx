import CustomAutocomplete from '../CaixaInput/CustomAutocomplete';
import { useEffect, useState } from 'react';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/api/payment';
import { Box, Card, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useCaixaContext } from '../../../contexts/CaixaContext';
import CurrencyInput from 'react-currency-input-field';
import CurrencyTextField from 'shared/components/CurrencyTextField/CurrencyTextField';
import { transformNumberToBr } from '../CaixaList/CaixaList';

const CaixaPayment = () => {
  const {
    tipoPagamento,
    setTipoPagamento,
    valorDaLista,
    valorComDesconto,
    setValorComDesconto,
    valorRecebido,
    setValorRecebido,
    setIsPorcentage,
    valorRetornado,
  } = useCaixaContext();
  const [descontoPorcentagem, setDescontoPorcentagem] = useState<
    number | string
  >('');
  const [descontoBruto, setDescontoBruto] = useState<number | string>('');

  const changeDesconto = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setState1: (value: React.SetStateAction<number | string>) => void,
    porcent?: boolean
  ) => {
    const newValue = event.target.value.replace(/[^0-9.]/g, '');
    if (/^\d*$/.test(newValue) || newValue === '') {
      const numericValue = newValue === '' ? '' : parseInt(newValue, 10);
      if (porcent) {
        setIsPorcentage(true);
        if (numericValue !== undefined && Number(numericValue) <= 100) {
          setState1(numericValue);
        }
      } else {
        setState1(numericValue);
        setIsPorcentage(false);
      }
    }
  };

  const changePagamento = (value: Payment | undefined) => {
    setTipoPagamento(value);
  };

  function handleVendedor() {
    return PaymentService.getFormasDePagamento();
  }

  function aplicarDesconto() {
    setValorComDesconto(valorDaLista);
    if (descontoBruto !== '')
      setValorComDesconto(valorDaLista - Number(descontoBruto));
    if (descontoPorcentagem !== '')
      setValorComDesconto(
        valorDaLista - (valorDaLista * Number(descontoPorcentagem)) / 100
      );
  }

  useEffect(() => {
    aplicarDesconto();
  }, [descontoBruto, descontoPorcentagem, valorDaLista, valorRecebido]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: '0.5em',
        gap: 1,
      }}
    >
      <CustomAutocomplete
        label="Forma de pagamento"
        placeholder="Procurar forma de pagamento"
        fetchOptions={handleVendedor}
        onUpdateValue={changePagamento}
        size="small"
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          disabled={!(descontoBruto === '')}
          label={'Desconto %'}
          autoComplete={'off'}
          value={descontoPorcentagem}
          onChange={(event) =>
            changeDesconto(event, setDescontoPorcentagem, true)
          }
          size="small"
        />
        <TextField
          fullWidth
          disabled={!(descontoPorcentagem === '')}
          label={'Desconto R$'}
          autoComplete={'off'}
          value={descontoBruto}
          onChange={(event) => changeDesconto(event, setDescontoBruto, false)}
          size="small"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <Typography>Valor com desconto</Typography>
        <Typography>R$ {transformNumberToBr(valorComDesconto)}</Typography>
      </Box>
      {tipoPagamento?.id.match('64e412a64703aba6f616ce7a') && (
        <CurrencyTextField
          label="Valor recebido"
          amount={valorRecebido}
          stateFunction={setValorRecebido}
          size="small"
        />
      )}
    </Card>
  );
};

export default CaixaPayment;
