import * as Yup from "yup"

export interface IProviderPackage {
    data: IProviderCadastroInfo[]
    message: string,
    errors: string,
    success: boolean
}
export type TAllProviderList = {
    data: IProviderPackage
}

export interface IProviderCadastroInfo {
    id?:string;
    address?: string
    cell?: string
    cep?: string
    city?: string
    cityId?: string
    cnpj: string
    code?: string
    contact?: string
    email?: string
    name: string,
    nameContact?: string,
    neighborhood?: string,
    number?: string
    stateRegistration?: string,
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
    number: Yup.string(),
    nameContact: Yup.string(),
    stateRegistration: Yup.string()
})