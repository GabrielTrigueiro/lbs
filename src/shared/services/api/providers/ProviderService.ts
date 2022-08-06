import { AxiosError } from "axios"
import { environment } from "../../../environment"
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
    const token = {
       headers:{
         Authorization: 
         `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
        }
    }
    return await api.post<IClientSearch>(environment.url_provider_search, dados, token)
    .then(data => {
        if(data instanceof AxiosError){
            return data
        }
        return data
    })
    .catch(err => {
        console.error(err)
    })
}
const getByIDd = async (id: string): Promise<IInfoProvider | Error>   => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    try {
        const {data} = await api.get(environment.url_provider + `${id}`, token)
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
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return  await api.put<IInfoProvider>(environment.url_provider + `${id}`, dados, token)
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
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.delete(environment.url_provider + `${id}`, token)
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
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<IProviderPackage>(environment.url_provider, dados, token)
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