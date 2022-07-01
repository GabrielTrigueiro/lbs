import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { ClienteService, IInfoClient } from "../../services";
import { VTextField } from "../forms-components/VTextField";
import "./styles.css";
import * as Yup from "yup";

interface ICadastroInfo {

  cpf: number;
  name: string;
  rg: number;
  sex: string;

  address: string;
  cep: number;
  city: string;
  uf: string;
  neighborhood: string;
  number: number;

  cell: number;
  email: string;
  telephone?: number;
}

const cadastroSchema: Yup.SchemaOf<ICadastroInfo> = Yup.object().shape({

  name: Yup.string().required('O nome é obrigatóro'),
  cpf: Yup.number().required('O cpf é obrigatório'),
  sex: Yup.string().required('O campo é obrigatório'),
  rg: Yup.number().required('O RG é obrigatório'),

  address:Yup.string().required('Endereço é obrigatório'),
  cep: Yup.number().required('CEP é obrigatório'),
  city: Yup.string().min(3, 'No minimo 3 caracteres').required('Cidade é obrigatório'),
  neighborhood: Yup.string().required('Bairro é obrigatório'),
  number: Yup.number().required('Número é obrigatório'),
  uf: Yup.string().required('Estado é obrgatório'),

  email: Yup.string().email().required('Email é obrigatório'),
  cell: Yup.number().required('Celular é obrigatório'),
  telephone: Yup.number(),
  
})
export const CadastroClienteForm: React.FC = () => {

  const handleSave = (dados: ICadastroInfo) => {
    
    cadastroSchema.validate(dados,{abortEarly:false})
    .then((dadosValidados)=>{
      console.log(dadosValidados)
      ClienteService.Create(dadosValidados)
    })
    .catch((err: Yup.ValidationError)=>{
      alert('aaaaaaaaaa')
    })

      // ClienteService.Create(dados)
      // .then(({success, message}) => {
      //   if (success){
      //     alert(message)
      //   }else{
      //     alert(message)
      //   }
      // })
  };

  

  return (
    <Form
      className="Form-Cadastro-Cliente"
      onSubmit={(dados) => handleSave(dados)}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
      >
        <Box display={"flex"} flex={1}>
          <Box flex={1}>
            <Typography m={1}>Dados Cadastrais</Typography>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField label="Nome" name="name" />
              <VTextField label="Sexo" name="sex" />
              <VTextField label="RG" name="rg" />
              <VTextField label="CPF" name="cpf" />
            </Box>
          </Box>
          <Box flex={1}>
            <Typography m={1}>Informações de Contato</Typography>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField label="Email" name="email" />
              <VTextField label="Número Fixo" name="telephone" />
              <VTextField label="Celular" name="cell" />
            </Box>
          </Box>
        </Box>

        <Box flex={1}>
          <Typography m={1}>Informações de Endereço</Typography>
          <Box display={"flex"}>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField label="UF" name="uf" />
              <VTextField label="CEP" name="cep" />
              <VTextField label="Endereço" name="address" />
            </Box>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField label="Cidade" name="city" />
              <VTextField label="Bairro" name="neighborhood" />
              <VTextField label="Número Residência" name="number" />
            </Box>
          </Box>
          <Box m={2} display={"flex"} justifyContent={"center"}>
            <Button sx={{color:'#000'}} type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </Form>
  );
};
