import { Form } from "@unform/web";
import { VTextField } from "./forms-components/VTextField";

export const CadastroClienteForm: React.FC = () => {
  return (
    <Form onSubmit={(dados) => console.log(dados)}>
      <VTextField name="name"/>
      <VTextField name="dataNascimento"/>
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
      <button type="submit">submit</button>
    </Form>
  );
};
