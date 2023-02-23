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
    address?: string
    cell?: string
    cep?: string
    city?: string
    cityId?: string
    cnpj: string
    code?: string
    contact?: string
    email?: string
    id?: string
    name: string,
    neighborhood?: string
    number?: string
    telephone?: string
    uf?: string
}

export const ProviderCadastroSchema: Yup.SchemaOf<IProviderCadastroInfo> = Yup.object().shape({
    id: Yup.string(),
    code: Yup.string(),
    name: Yup.string().required("O nome é obrigatóro"),
    cnpj: Yup.string().required("O CNPJ é obrigatório"),
    contact: Yup.string(),
    email: Yup.string(),
    telephone:Yup.string(),
    cell:Yup.string(),
    cep: Yup.string(),
    address: Yup.string(),
    cityId: Yup.string(),
    city: Yup.string(),
    uf: Yup.string(),
    neighborhood: Yup.string(),
    number: Yup.string()
})