import { RestorePageRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { useEffect } from "react";
import { ClienteService } from "../services";
import { VTextField } from "./forms-components/VTextField";

interface ICadastroData {
  address: string
  cell: string
  cep: string
  city: string
  cpf: string
  email: string
  name: string
  neighborhood: string
  number: string
  rg: string
  sex: string
  telephone: string
  uf: string
}

const handleSave = (dados: ICadastroData) => {
  ClienteService.Create(dados).then(
    console.log
  ).catch(console.error)
}

export const CadastroClienteForm: React.FC = () => {
  return (
    <Form onSubmit={(dados) => handleSave(dados)} >
      <Box display={'flex'} flexDirection={"column"}>
        <Box display={'flex'} flex={1}>
          <VTextField required label="Nome" name="name"/>
          <VTextField required label="Sexo" name="sex"/>
          <VTextField required label="RG" name="rg"/>
          <VTextField required label="CPF" name="cpf"/>
        </Box>
        <Box display={'flex'} flex={1}>
          <VTextField required label="Email" name="email"/>
          <VTextField label="Número Fixo" name="telephone"/>
          <VTextField required label="Celular" name="cell"/>
        </Box>
        <Box display={'flex'} flex={1}>
          <VTextField required label="CEP" name="cep"/>
          <VTextField required label="Endereço" name="address"/>
          <VTextField required label="Cidade" name="city"/>
        </Box>
        <Box display={'flex'} flex={1}>
          <VTextField required label="UF" name="uf"/>
          <VTextField required label="Bairro" name="neighborhood"/>
          <VTextField required label="Número Residência" name="number"/>
        </Box>
        <Button type="submit" variant='contained'>Salvar</Button>
      </Box>
    </Form>
  );
};
