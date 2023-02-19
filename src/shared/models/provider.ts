import * as Yup from "yup"

export interface IInfoProvider {
    id?: string
    code: number
    name: string
    cnpj: string
    contact: number
    email: string
    telephone: number
    cell: number
    cep: number
    address: string
    cityId?: string
    city: string
    uf: string
    neighborhood: string
    number: number
}
export interface IProviderPackage {
    data: IInfoProvider[]
    message: string,
    errors: string,
    success: boolean
}
export type TAllProviderList = {
    data: IProviderPackage
}

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