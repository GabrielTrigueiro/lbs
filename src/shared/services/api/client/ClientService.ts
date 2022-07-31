import { AxiosError } from "axios"
import { environment, TokenConfig } from "../../../environment";
import { api } from "../axios-config"

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
const getAll = async (dados: ISendPagination): Promise<any | Error> => {
    
    return await api.post<IClientSearch>(environment.url_Client_search, dados, TokenConfig)
    .then(data => {
        if(data instanceof AxiosError){
            return data
        }
        console.log(data)
        return data
    })
    .catch(err => {
        console.error(err)
    })
}
const getByIDd = async (id: string): Promise<IInfoClient | Error> => {
    try {
        const {data} = await api.get( environment.url_client + `${id}`, TokenConfig)
        if(data){
            return data
        }
        return new Error('Erro ao procurar o registro')
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao procurar o registro')
    }
}
const UpdateById = async (id: string, dados: IInfoClient): Promise<void | Error> => {
  
    return  await api.put<IInfoClient>(environment.url_client + `${id}`, dados, TokenConfig)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        console.error(err)
      })
}
const DeleteById = async (id: string): Promise<void | Error> => {
    return await api.delete(environment.url_client + `${id}`, TokenConfig)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        console.error(err)
      })
}
const Create = async (dados: IInfoClient): Promise<any | Error> => {

    return await api.post<IClientPackage>(environment.url_client, dados, TokenConfig)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        console.error(err)
      })
}

export const ClienteService = {
    getAll,
    getByIDd,
    UpdateById,
    DeleteById,
    Create,
}
