import CustomAutocomplete from "../CaixaInput/CustomAutocomplete";
import {useEffect, useState} from "react";
import {Payment} from "../../../models/payment";
import {PaymentService} from "../../../services/api/payment";
import {Box, Card, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useCaixaContext} from "../../../contexts/CaixaContext";

const CaixaPayment = () => {
  const {
    tipoPagamento,
    setTipoPagamento,
    valorDaLista,
    valorComDesconto,
    setValorComDesconto,
    valorRecebido,
    setValorRecebido
  } = useCaixaContext();
  const [descontoPorcentagem, setDescontoPorcentagem] = useState<number | string>('');
  const [descontoBruto, setDescontoBruto] = useState<number | string>('');

  const changeDesconto = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setState1: (value: React.SetStateAction<number | string>) => void,
    porcent?: boolean
  ) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue) || newValue === '') {
      const numericValue = newValue === '' ? '' : parseInt(newValue, 10);
      if(porcent){
        if (numericValue !== undefined && numericValue <= 100) {
          setState1(numericValue);
        }
      }
      else setState1(numericValue);
    }
  };

  const changePagamento = (value: Payment | undefined) => {
    setTipoPagamento(value);
  };

  const changeValorRecebido = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue) || newValue === '') {
      const numericValue = newValue === '' ? 0 : parseInt(newValue, 10);
      setValorRecebido(numericValue);
    }
  };

  function handleVendedor() {
    return PaymentService.getFormasDePagamento();
  }

  function aplicarDesconto() {
    setValorComDesconto(valorDaLista);
    if (descontoBruto !== '') setValorComDesconto(valorDaLista - Number(descontoBruto))
    if (descontoPorcentagem !== '') setValorComDesconto(valorDaLista - valorDaLista * Number(descontoPorcentagem) / 100)
  }

  useEffect(() => {
    aplicarDesconto();
  }, [descontoBruto, descontoPorcentagem, valorDaLista]);

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
      />
      <Box sx={{display: 'flex', justifyContent: "space-between", alignItems: "center", gap: 1}}>
        <TextField
          disabled={!(descontoBruto === '')}
          size={"small"}
          label={"Desconto %"}
          autoComplete={"off"}
          value={descontoPorcentagem}
          onChange={(event) => changeDesconto(event, setDescontoPorcentagem, true)}
        />
        <TextField
          disabled={!(descontoPorcentagem === '')}
          size={"small"}
          label={"Desconto R$"}
          autoComplete={"off"}
          value={descontoBruto}
          onChange={(event) => changeDesconto(event, setDescontoBruto, false)}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        flexDirection: "column",
      }}>
        <Typography>Valor com desconto</Typography>
        <Typography>R$ {valorComDesconto.toFixed(2)}</Typography>
      </Box>
      {tipoPagamento?.id.match('64e412a64703aba6f616ce7a') && (
        <TextField
          size={"small"}
          label={"Valor recebido"}
          autoComplete={"off"}
          value={valorRecebido}
          onChange={(event) => changeValorRecebido(event)}
        />
      )}
    </Card>
  )
}

export default CaixaPayment;