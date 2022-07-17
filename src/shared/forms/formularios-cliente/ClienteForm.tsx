import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { ClienteService, IInfoClient } from "../../services";
import { VTextField } from "../forms-components/VTextField";
import "./styles.css";
import * as Yup from "yup";
import { useVForm } from "../forms-components/UseVForm";
import { Gender, VSelectField } from "../forms-components";
import { useState } from "react";

export interface ICadastroInfo {
  cpf: number
  name: string
  rg: number
  sex: string

  address: string
  cep: number
  city: string
  uf: string
  neighborhood: string
  number: number

  cell: number
  email: string
  telephone?: number
}

export const cadastroSchema: Yup.SchemaOf<ICadastroInfo> = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatóro"),
  cpf: Yup.number().required("O cpf é obrigatório").typeError("Digite apenas números"),
  sex: Yup.string().required("O campo é obrigatório"),
  rg: Yup.number().required("O RG é obrigatório").typeError("Digite apenas números"),

  address: Yup.string().required("Endereço é obrigatório"),
  cep: Yup.number().required("CEP é obrigatório").typeError("Digite apenas números"),
  city: Yup.string().min(3, "No minimo 3 caracteres").required("Cidade é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
  number: Yup.number().required("Número é obrigatório").typeError("Digite apenas números"),
  uf: Yup.string().required("Estado é obrgatório"),

  email: Yup.string().email("Digite um email válido").required("Email é obrigatório"),
  cell: Yup.number().required("Celular é obrigatório").typeError("Digite apenas números"),
  telephone: Yup.number().typeError("Digite apenas números"),
})

export const CadastroClienteForm: React.FC<{
  update: () => void,
  handleModal: () => void
  client?: IInfoClient
  type: string
}> = ({ update, handleModal, client, type }) => {
  const close = () => { handleModal()}

  const { formRef } = useVForm()

  const handleSave = (dados: ICadastroInfo) => {
    cadastroSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        ClienteService.Create(dadosValidados).then((result) => {
          alert("Cliente cadastrado com sucesso!!!");
          close();
          update();
        });
      })
      .catch((erros: Yup.ValidationError) => {
        const validandoErros: { [key: string]: string } = {};
        erros.inner.forEach((erros) => {
          if (!erros.path) return;
          validandoErros[erros.path] = erros.message;
        });
        formRef.current?.setErrors(validandoErros);
      });
  }

  const handleEdit = (dados: IInfoClient) =>{
    cadastroSchema.validate(dados,{abortEarly:false})
    .then((dadosValidados)=>{
      if(dados.id)
      ClienteService.UpdateById(dados.id, dados).then(result => {
      alert("Cliente editado com sucesso!!!")
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

  const handleSubmit = (dados: ICadastroInfo | IInfoClient) => {
    if(type === 'edit'){
      handleEdit(dados)
    }else{
      handleSave(dados)
    }
  }

  const [cepData, setCepData] = useState('')

  function getCEP (cep:string) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        setCepData(data)
      })
  }

  return (
    <Form
      initialData={client}
      ref={formRef}
      className="Form-Cadastro-Cliente"
      onSubmit={(dados) => {
        dados.id = client?.id
        handleSubmit(dados)
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        className="Conteiner-Interior-Geral"
      >
        <Box
          height={70}
          width={"100%"}
          bgcolor={"#575A61"}
          display={"flex"}
          alignItems={"center"}
          paddingLeft={3}
        >
          <Typography
            sx={{ fontWeight: "500", fontSize: "25px", color: "#fff" }}
          >
            Cadastrar Cliente
          </Typography>
        </Box>
        <Box className="Container-Interior-Formulario">
          <Box display={"flex"} justifyContent={"space-around"}>
            <Box
              className="Form-Interior-Top"
              display={"flex"}
              flexDirection={"column"}
            >
              <VTextField label="Nome" name="name" />
              <VSelectField
                sx={{ height: "30px" }}
                name="sex"
                label="Gênero"
                listOption={Gender}
              />
              <VTextField label="RG" name="rg" />
              <VTextField label="CPF" name="cpf" />
            </Box>
            <Box
              className="Form-Interior-Top"
              display={"flex"}
              flexDirection={"column"}
            >
              <VTextField label="Email" name="email" />
              <VTextField label="Número Fixo" name="telephone" />
              <VTextField label="Celular" name="cell" />
            </Box>
          </Box>
          <Box flex={1}>
            <Typography sx={{mt:4, ml:2,fontWeight:'500', color: '#575A61'}}>Informações de Endereço</Typography>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Box className="Form-Interior-Bottom">
                <VTextField label="UF" name="uf" />
                <VTextField label="CEP" name="cep"/>
                <VTextField label="Endereço" name="address" />
                <VTextField label="Cidade" name="city" />
              </Box>
              <Box className="Form-Interior-Bottom">
                <VTextField label="Bairro" name="neighborhood" />
                <VTextField label="Número Residência" name="number" />

                <Box className="Container-Botoes">
                  <Button 
                    sx={{ color: "#fff", width:100, backgroundColor:'#575A61'}}
                    type="submit"
                    variant="contained"
                    onClick={close}
                  >
                    Cancelar
                  </Button>
                  <Button
                    sx={{ color: "#fff", width:100, backgroundColor:'#575A61'}}
                    type="submit"
                    variant="contained"
                  >
                    Salvar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Form>
  );
};
