import CustomAutocomplete from "../CaixaInput/CustomAutocomplete";
import {useState} from "react";
import {Payment} from "../../../models/payment";
import {PaymentService} from "../../../services/api/payment";
import {Box, Card, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";

const CaixaPayment = () => {
  const [pagamento, setPagamento] = useState<any | null>(null);
  const [valor, setValor] = useState<number | string>('');
  const [descontoPorcentagem, setDescontoPorcentagem] = useState<number | string>('');
  const [descontoBruto, setDescontoBruto] = useState<number | string>('');

  const changeDesconto = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setState1: (value: React.SetStateAction<number | string>) => void,
  ) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue) || newValue === '') {
      setState1(newValue);
    }
  };

  const changePagamento = (value: Payment | null) => {
    setPagamento(value);
  };

  function handleVendedor() {
    return PaymentService.getFormasDePagamento();
  }

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
          label={"Desconto %"}
          autoComplete={"off"}
          inputProps={{min: 0}}
          value={descontoPorcentagem}
          onChange={(event) => changeDesconto(event, setDescontoPorcentagem)}
        />
        <TextField
          label={"Desconto R$"}
          autoComplete={"off"}
          inputProps={{min: 0}}
          value={descontoBruto}
          onChange={(event) => changeDesconto(event, setDescontoBruto)}
        />
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1,}}>
        <Typography>Valor: R$ 0.00</Typography>
      </Box>
    </Card>
  )
}

export default CaixaPayment;