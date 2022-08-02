import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { ClienteService, IInfoClient } from "../../services";
import { VTextField } from "../forms-components/VTextField";
import "./styles.css";
import * as Yup from "yup";
import { useVForm } from "../forms-components/UseVForm";
import { Gender, VSelectField } from "../forms-components";
import { useContext, useState } from "react";
import { Snack, SnackbarContext } from "../../contexts/NotificationContext";
export interface IClienteCadastroInfo {
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

  isActive?: boolean
}

export const ClienteCadastroSchema: Yup.SchemaOf<IClienteCadastroInfo> = Yup.object().shape({
  name:
  Yup.string()
  .required("O nome é obrigatóro"),

  cpf:
  Yup.number()
  .required("O cpf é obrigatório")
  .typeError("Digite apenas números"),

  sex: Yup.string()
  .required("O campo é obrigatório"),

  rg: Yup.number()
  .required("O RG é obrigatório")
  .typeError("Digite apenas números"),

  address:
  Yup.string()
  .required("Endereço é obrigatório"),

  cep:
  Yup.number()
  .min(8, "É necessário 8 digitos")
  .required("CEP é obrigatório")
  .typeError("Digite apenas números"),

  city:
  Yup.string()
  .min(3, "No minimo 3 caracteres")
  .required("Cidade é obrigatório"),

  neighborhood:
  Yup.string()
  .required("Bairro é obrigatório"),

  number:
  Yup.number()
  .required("Número é obrigatório")
  .typeError("Digite apenas números"),

  uf:
  Yup.string()
  .required("Estado é obrigatório"),

  email:
  Yup.string()
  .email("Digite um email válido")
  .required("Email é obrigatório"),

  cell:
  Yup.number()
  .required("Celular é obrigatório")
  .typeError("Digite apenas números"),

  telephone:
  Yup.number()
  .typeError("Digite apenas números"),

  isActive: Yup.boolean()
})

export const CadastroClienteForm: React.FC<{
  update: () => void,
  handleModal: () => void
  tittle: string
  client?: IInfoClient
  type: string
}> = ({ update, handleModal, client, type, tittle}) => {

  const close = () => { handleModal()}
  const { formRef } = useVForm()
  const {setSnack} = useContext(SnackbarContext);  

  const handleSave = (dados: IClienteCadastroInfo) => {
    ClienteCadastroSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        ClienteService.Create(dadosValidados).then((result) => {
          setSnack(new Snack({
            message: "Cliente cadastrado com sucesso!!!",
            color:'success',
            open: true
          }))
          close();
          update();
        });
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

  const handleEdit = (dados: IInfoClient) =>{
    ClienteCadastroSchema.validate(dados,{abortEarly:false})
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

  const handleSubmit = (dados: IClienteCadastroInfo | IInfoClient) => {
    if(type === 'edit'){
      handleEdit(dados)
    }else{
      handleSave(dados)
    }
  }

  function getCepData (ev: any) {
    const {value} = ev.target
    const cep = value?.replace(/[^0-9]/g, '')
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      formRef.current?.setFieldValue('city', `${data.localidade}`)
      formRef.current?.setFieldValue('uf', `${data.uf}`)
      formRef.current?.setFieldValue('address', `${data.logradouro}`)
      formRef.current?.setFieldValue('neighborhood', `${data.bairro}`)
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
          minHeight={70}
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
            {tittle}
          </Typography>
        </Box>
        <Box className="Container-Interior-Formulario">
          <Box display={"flex"} justifyContent={"space-around"}>
            <Box
              className="Form-Interior-Top"
              display={"flex"}
              flexDirection={"column"}
            >
              <VTextField sx={{mt:1}} label="Nome" name="name" />
              <VSelectField
                sx={{ 
                  height: "30px" , 
                  fontSize:16
                }}
                name="sex"
                label="Gênero"
                listOption={Gender}
              />
              <VTextField sx={{mt:1}} label="RG" name="rg" />
              <VTextField sx={{mt:1}} label="CPF" name="cpf" />
            </Box>
            <Box
              className="Form-Interior-Top"
              display={"flex"}
              flexDirection={"column"}
            >
              <VTextField sx={{mt:1}} label="Email" name="email" />
              <VTextField sx={{mt:1}} label="Número Fixo" name="telephone" />
              <VTextField sx={{mt:1}} label="Celular" name="cell"/>
              
            </Box>
          </Box>
          <Box flex={1}>
            <Typography sx={{mt:4, ml:11,fontWeight:'500', color: '#575A61'}}>Informações de Endereço</Typography>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Box className="Form-Interior-Bottom">
                <VTextField sx={{mt:1}} label="UF" name="uf" />
                <VTextField sx={{mt:1}} label="CEP" name="cep" onBlur={getCepData}/>
                <VTextField sx={{mt:1}} label="Endereço" name="address"/>
                <VTextField sx={{mt:1}} label="Cidade" name="city"/>
              </Box>
              <Box className="Form-Interior-Bottom">
                <VTextField sx={{mt:1}} label="Bairro" name="neighborhood" />
                <VTextField sx={{mt:1}} label="Número Residência" name="number" />

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
