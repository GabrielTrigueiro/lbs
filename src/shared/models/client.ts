import * as yup from 'yup';

export interface RegisterClient {
    address: string,
    cell: string,
    cep: string,
    city: string,
    cpf: string,
    email: string,
    name: string,
    neighborhood: string,
    number: string,
    rg: string,
    sex: string,
    telephone: string,
    uf: string
}

export const clientValidationSchema = yup.object({
    address: yup.string().required("Preencha o endereço"),
    cell: yup.string().required("Preencha o celular"),
    cep: yup.string().required("Preencha o CEP"),
    city: yup.string().required("Preencha a cidade"),
    cpf: yup.string().required("Preencha o CPF"),
    email: yup.string().email().required("Preencha o email"),
    name: yup.string().required("Preencha o nome"),
    neighborhood: yup.string().required("Preencha o bairro"),
    number: yup.number().required("Preencha o número da residência").typeError("Apenas números"),
    rg: yup.string().required("Preencha o RG"),
    sex: yup.string().required("Preencha o gênero"),
    telephone: yup.string().required("Preencha o residencial "),
    uf: yup.string().required("Preencha o estado"),
})