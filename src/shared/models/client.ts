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
    sex: string,
    telephone?: string,
    isActive?: boolean
    uf: string
}

export interface IInfoClient {
    id?: string;
    cpf: number;
    name: string;
    rg: number;
    sex: string;
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
    address: yup.string().required("Preencha o endereço"),
    cell: yup.string().required("Preencha o celular"),
    cep: yup.string().required("Preencha o CEP"),
    city: yup.string().required("Preencha a cidade"),
    cpf: yup.string().required("Preencha o CPF"),
    email: yup.string().email().required("Preencha o email"),
    name: yup.string().required("Preencha o nome"),
    neighborhood: yup.string().required("Preencha o bairro"),
    number: yup.string().required("Preencha o número da residência").typeError("Apenas números"),
    rg: yup.string().required("Preencha o RG"),
    sex: yup.string().required("Preencha o gênero"),
    telephone: yup.string().required("Preencha o residencial "),
    uf: yup.string().required("Preencha o estado"),
})