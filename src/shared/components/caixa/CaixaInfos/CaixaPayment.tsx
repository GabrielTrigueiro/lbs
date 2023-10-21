import CustomAutocomplete from '../CaixaInput/CustomAutocomplete';
import { useCallback, useEffect, useState } from 'react';
import { Payment } from '../../../models/payment';
import { PaymentService } from '../../../services/api/payment';
import { Box, Card, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useCaixaContext } from '../../../contexts/CaixaContext';
import CurrencyTextField from 'shared/components/CurrencyTextField/CurrencyTextField';
import { transformNumberToBr } from '../CaixaList/CaixaList';
import CurrencyInput from 'react-currency-input-field';
import { log } from 'console';

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
  } = useCaixaContext();
  const [descontoPorcentagem, setDescontoPorcentagem] = useState<
    number | string
  >('');
  const [teste, setTeste] = useState<string>('');

  const changeDescontoPorcent = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newValue = event.target.value.replace(/[^0-9.]/g, '');
    if (/^\d*$/.test(newValue) || newValue === '') {
      const numericValue = newValue === '' ? '' : parseInt(newValue, 10);
      setIsPorcentage(true);
      if (numericValue !== undefined && Number(numericValue) <= 100) {
        setDescontoPorcentagem(numericValue);
      }
    }
  };
  const handleAmountChange = (value: any) => {
    setTeste(value);
  };
  const changePagamento = (value: Payment | undefined) => {
    setTipoPagamento(value);
  };
  const handleVendedor = useCallback(() => {
    return PaymentService.getFormasDePagamento();
  }, []);
  function aplicarDesconto() {
    setValorComDesconto(valorDaLista);
    console.log(teste);
    if (teste !== '' && teste !== undefined) {
      let bruto = parseFloat(teste.replace(',', '.'));
      setValorComDesconto(valorDaLista - Number(bruto));
    }
    if (descontoPorcentagem !== '')
      setValorComDesconto(
        valorDaLista - (valorDaLista * Number(descontoPorcentagem)) / 100
      );
  }
  useEffect(() => {
    aplicarDesconto();
  }, [
    descontoPorcentagem,
    valorDaLista,
    valorRecebido,
    tipoPagamento,
    setTeste,
    teste,
  ]);

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
          disabled={!(teste === '' || teste === undefined)}
          label={'Desconto %'}
          autoComplete={'off'}
          value={descontoPorcentagem}
          onChange={(event) => changeDescontoPorcent(event)}
          size="small"
        />
        <TextField
          fullWidth
          disabled={!(descontoPorcentagem === '')}
          size="small"
          autoComplete="off"
          label={'Desconto $'}
          variant="outlined"
          InputProps={{
            inputComponent: CurrencyInput as any,
            inputProps: {
              prefix: 'R$ ',
              decimalSeparator: ',',
              groupSeparator: '.',
              allowNegativeValue: false,
              decimalScale: 2,
              onValueChange: handleAmountChange,
            },
            value: teste,
          }}
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
