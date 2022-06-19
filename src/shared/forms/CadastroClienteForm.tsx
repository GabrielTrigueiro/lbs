import { RestorePageRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
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
      <VTextField name="name"/>
      <VTextField name="sex"/>
      <VTextField name="rg"/>
      <VTextField name="cpf"/>
      <VTextField name="email"/>
      <VTextField name="telephone"/>
      <VTextField name="cell"/>
      <VTextField name="cep"/>
      <VTextField name="address"/>
      <VTextField name="city"/>
      <VTextField name="uf"/>
      <VTextField name="neighborhood"/>
      <VTextField name="number"/>
      <Button type="submit" variant='contained'>Salvar</Button>
    </Form>
  );
};
