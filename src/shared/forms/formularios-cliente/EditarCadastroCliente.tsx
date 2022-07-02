import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { ClienteService, IInfoClient } from "../../services";
import { useVForm } from "../forms-components/UseVForm";
import { VTextField } from "../forms-components/VTextField";
import { cadastroSchema } from "./CadastroClienteForm";
import "./styles.css";
import * as Yup from "yup";

export const EditarCadastroCliente: React.FC<{client: IInfoClient, update: ()=>void}> = ({client, update}) => {

  const {formRef} = useVForm()

  const handleEdit = (dados: IInfoClient) =>{
    cadastroSchema.validate(dados,{abortEarly:false})
    .then((dadosValidados)=>{
      if(dados.id)
      ClienteService.UpdateById(dados.id, dados).then(result => {
      update()
      })
    })
    .catch((erros: Yup.ValidationError)=>{
      const validandoErros: {[key:string]: string} = {}
      erros.inner.forEach(erros =>{
        if(!erros.path)return
        validandoErros[erros.path] = erros.message
      })
      formRef.current?.setErrors(validandoErros)
    })
  }

  return (
    <Form initialData={client}
      ref={formRef}
      className="Form-Cadastro-Cliente"
      onSubmit={(dados)=>{
        dados.id = client.id
        handleEdit(dados)
      }}
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
              <VTextField required label="Nome" name="name" />
              <VTextField required label="Sexo" name="sex" />
              <VTextField required label="RG" name="rg" />
              <VTextField required label="CPF" name="cpf" />
            </Box>
          </Box>
          <Box flex={1}>
            <Typography m={1}>Informações de Contato</Typography>
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
