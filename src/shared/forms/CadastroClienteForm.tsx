import { Form } from "@unform/web";
import { VTextField } from "./forms-components/VTextField";

export const CadastroClienteForm: React.FC = () => {
  return (
    <Form onSubmit={console.log}>
      <VTextField name="Nome Completo"
        
      />
    </Form>
  );
};
