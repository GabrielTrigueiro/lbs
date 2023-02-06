import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@unform/web";
import { VTextField } from "../forms-components/VTextField";
import * as Yup from "yup";
import { useVForm } from "../forms-components/UseVForm";
import { IInfoProvider, ProviderService } from "../../services/api/providers/ProviderService";
import "./styles.css"
import { useContext } from "react";
import { Snack, SnackbarContext } from "../../contexts/NotificationContext";
import { PhoneImput } from "../forms-components/PhoneImput";
import { CepInput } from "../forms-components/CepInput";

export interface IProviderCadastroInfo {
    code: number
    name: string
    cnpj: string

    contact: number
    email: string
    telephone: number
    cell: number

    cep:number
    address: string
    cityId?: string
    city: string
    uf: string
    neighborhood: string
    number: number
}

export const ProviderCadastroSchema: Yup.SchemaOf<IProviderCadastroInfo> = Yup.object().shape({
    code: Yup.number().required("O id é obrigatório").typeError("Digite apenas números"),
    name: Yup.string().required("O nome é obrigatóro"),
    cnpj: Yup.string().required("O CNPJ é obrigatório").typeError("Digite apenas números"),

    contact: Yup.number().required("O Campo é obrigatório").typeError("Digite apenas números"),
    email: Yup.string().required("Email orbigatório"),
    telephone:Yup.number().required("Telefone é obrigatório").typeError("Digite apenas números"),
    cell:Yup.number().required("Celular é obrigatório").typeError("Digite apenas números"),

    cep: Yup.number().min(8, "É necessário 8 digitos").required("CEP é obrigatório"),
    address: Yup.string().required("Endereço é obrigatório"),
    cityId: Yup.string().required("O id é obrigatório").typeError("Digite apenas números"),
    city: Yup.string().required("A cidade é obrigatório"),
    uf: Yup.string().required("O estado é obrigatório"),
    neighborhood: Yup.string().required("O bairro é obrigatório"),
    number: Yup.number().required("O Número é obrigatório").typeError("Digite apenas números"),
  
})

export const ProviderForm: React.FC<{
  update: () => void,
  handleModal: () => void
  tittle:string
  provider?: IInfoProvider
  type: string
}> = ({ update, handleModal, provider, type, tittle }) => {
  const close = () => { handleModal()}

  const { formRef } = useVForm()
  const {setSnack} = useContext(SnackbarContext);  

  const handleSave = (dados: IProviderCadastroInfo) => {
    ProviderCadastroSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        ProviderService.Create(dadosValidados).then((result) => {
          alert("Fornecedor cadastrado com sucesso!!!");
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

  const handleEdit = (dados: IInfoProvider) =>{
    ProviderCadastroSchema.validate(dados,{abortEarly:false})
    .then((dadosValidados)=>{
      if(dados.id)
      ProviderService.UpdateById(dados.id, dados).then(result => {
        setSnack(new Snack({
          message: 'Atualização realizada com sucesso',
          color:'success',
          open: true
        }))
      close()
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

  const handleSubmit = (dados: IProviderCadastroInfo | IInfoProvider) => {
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
    .catch(err =>{
      console.log('erro no fetch')
      console.log(err)
    })
    .then((data) => {
      if(data.localidade === undefined){
        formRef.current?.setFieldValue('city', '')
        formRef.current?.setFieldValue('uf', '')
        formRef.current?.setFieldValue('address', '')
        formRef.current?.setFieldValue('neighborhood', '')
      }else{
        formRef.current?.setFieldValue('city', `${data.localidade}`)
        formRef.current?.setFieldValue('uf', `${data.uf}`)
        formRef.current?.setFieldValue('address', `${data.logradouro}`)
        formRef.current?.setFieldValue('neighborhood', `${data.bairro}`)
      }
    })
    .catch(err => {
      console.log('quantidade de digitos invalida')
      console.log(err)
    })
  }

  return (
    <Form
      initialData={provider}
      ref={formRef}
      className="Form-Provider"
      onSubmit={(dados) => {
        dados.id = provider?.id
        handleSubmit(dados)
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        className="Container-Interior-Geral"
      >
        <Box
          height={70}
          minHeight={70}
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
              <VTextField sx={{mt:1}} label="Código" name="code" />
              <VTextField sx={{mt:1}} label="Nome" name="name" />
              <VTextField sx={{mt:1}} label="CNPJ" name="cnpj" />
            </Box>
            <Box
              className="Form-Interior-Top"
              display={"flex"}
              flexDirection={"column"}
            >
              <VTextField sx={{mt:1}} label="Contato" name="contact" />
              <VTextField sx={{mt:1}} label="Email" name="email" />
              <VTextField sx={{mt:1}} label="Fixo" name="telephone" />
              <PhoneImput sx={{mt:1}} label="Celular" name="cell" />
            </Box>
          </Box>
          <Box flex={1}>
            <Typography sx={{mt:2, ml:11,fontWeight:'500', color: '#575A61'}}>Informações de Endereço</Typography>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Box className="Form-Interior-Bottom">
                <VTextField sx={{mt:1}} label="UF" name="uf" />
                <VTextField sx={{mt:1}} label="Endereço" name="address"/>
                <VTextField sx={{mt:1}} label="Cidade" name="city"/>
                <VTextField sx={{mt:1}} label="Id Cidade" name="cityId" />
              </Box>
              <Box className="Form-Interior-Bottom">
                <VTextField sx={{mt:1}} label="CEP" name="cep" onBlur={getCepData}/>
                <VTextField sx={{mt:1}} label="Bairro" name="neighborhood" />
                <VTextField sx={{mt:1}} label="Número Residência" name="number" />

                <Box className="Container-Botoes-Provider">
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
