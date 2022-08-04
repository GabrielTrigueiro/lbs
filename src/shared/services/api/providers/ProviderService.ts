import { AxiosError } from "axios"
import { environment, TokenConfig } from "../../../environment"
import { api } from "../axios-config"
import { IClientSearch, ISendPagination } from "../client"

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

const getAll = async (dados: ISendPagination): Promise<any | Error> => {
    //trocar pra provider
    return await api.post<IClientSearch>(environment.url_provider_search, dados, TokenConfig)
    .then(data => {
        if(data instanceof AxiosError){
            return data
        }
        return data
    })
    .catch(err => {
        // console.log('erro no getAll')
        console.error(err)
    })
}
const getByIDd = async (id: string): Promise<IInfoProvider | Error>   => {
    try {
        const {data} = await api.get(environment.url_provider + `${id}`, TokenConfig)
        if(data){
            return data
        }
        return new Error('Erro ao procurar o registro')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao carregar página')
    }
}
const UpdateById = async (id: string, dados: IInfoProvider): Promise<void | Error>   => {
  
    return  await api.put<IInfoProvider>(environment.url_provider + `${id}`, dados, TokenConfig)
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
const DeleteById = async (id: string): Promise<void | Error>   => {
    return await api.delete(environment.url_provider + `${id}`, TokenConfig)
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
const Create = async (dados: IInfoProvider): Promise<any>   => {

    return await api.post<IProviderPackage>(environment.url_provider, dados, TokenConfig)
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
export const ProviderService = {
    getAll,
    getByIDd,
    DeleteById,
    UpdateById,
    Create
}