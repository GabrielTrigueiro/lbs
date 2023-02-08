import * as yup from 'yup';

export interface RegisterClient {
    id?: string;
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
    telephone?: string,
    isActive?: boolean
    uf: string
    indicacoesIds?: string[]
}

export interface IInfoClient {
    id?: string;
    cpf: number;
    name: string;
    rg: number;
    dataNascimento: string;
    address: string;
    cep: number;
    city: string;
    uf: string;
    neighborhood: string;
    number: number;
    cell: number;
    email: string;
    telephone?: number;
    isActive?: boolean
}
export interface IClientPackage {
    data: IInfoClient[],
    message: string,
    errors: string,
    success: boolean
}

export interface IClientSearch {
    numberOfPages: number
    actualPage: number
    totalElements: number
    hasNext: boolean
    data: IInfoClient[]
}

export interface ISendPagination {
    page: number
    pageSize: number
    sortField: string
    sortDiresction: string
    param: string
    value: string
}

export interface IReceivePagination{
    numberOfPages:number
    actualPage: number
    hasNext: boolean
}

export type TAllClientList = {
    data: IClientPackage
}

export const clientValidationSchema = yup.object({
    address: yup.string(),
    cell: yup.string(),
    cep: yup.string(),
    city: yup.string(),
    cpf: yup.string().required("Preencha o CPF"),
    email: yup.string(),
    name: yup.string().required("Preencha o nome"),
    neighborhood: yup.string(),
    number: yup.string().typeError("Apenas números"),
    rg: yup.string(),
    telephone: yup.string(),
    uf: yup.string(),
    dataNascimento: yup.string().required("Preencha a data de nascimento")
})