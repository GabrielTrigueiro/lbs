import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { ClienteService } from "../services";
import { VTextField } from "./forms-components/VTextField";
import "./styles.css";

interface ICadastroData {
  id: string;
  address: string;
  cell: string;
  cep: string;
  city: string;
  cpf: string;
  email: string;
  name: string;
  neighborhood: string;
  number: string;
  rg: string;
  sex: string;
  telephone: string;
  uf: string;
}

const handleSave = (dados: ICadastroData) => {
  ClienteService.Create(dados).then(console.log).catch(console.error);
};

export const EditarCadastroCliente: React.FC = () => {
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
            <Typography>Dados Cadastrais</Typography>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField required label="Nome" name="name" />
              <VTextField required label="Sexo" name="sex" />
              <VTextField required label="RG" name="rg" />
              <VTextField required label="CPF" name="cpf" />
            </Box>
          </Box>
          <Box flex={1}>
            <Typography>Informações de Contato</Typography>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField required label="Email" name="email" />
              <VTextField label="Número Fixo" name="telephone" />
              <VTextField required label="Celular" name="cell" />
            </Box>
          </Box>
        </Box>

        <Box flex={1}>
          <Typography m={1}>Informações de Endereço</Typography>
          <Box display={"flex"}>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField required label="UF" name="uf" />
              <VTextField required label="CEP" name="cep" />
              <VTextField required label="Endereço" name="address" />
            </Box>
            <Box m={1} flex={1} display={"flex"} flexDirection={"column"}>
              <VTextField required label="Cidade" name="city" />
              <VTextField required label="Bairro" name="neighborhood" />
              <VTextField required label="Número Residência" name="number" />
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
