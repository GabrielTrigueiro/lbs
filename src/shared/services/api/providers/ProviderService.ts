import { AxiosError } from "axios"
import { environment } from "../../../environment"
import { api } from "../axios"
import { ISendPagination, IClientSearch } from "../../../models/client"
import { IInfoProvider, IProviderCadastroInfo, IProviderPackage } from "../../../models/provider"
import { Notification } from "../../../components"

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

const UpdateById = async (id: string, dados: IProviderCadastroInfo): Promise<void | Error>   => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return  await api.put<IProviderCadastroInfo>(environment.url_provider + `/${id}`, dados, token)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        Notification(err.response?.data.message, "error")
      })
}

const DeleteById = async (id: string): Promise<void | Error>   => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.delete(environment.url_provider + `/${id}`, token)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        Notification(err.response?.data.message, "error")
      })
}

const Create = async (dados: IProviderCadastroInfo): Promise<any | Error>   => {
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
        Notification(err.response?.data.message, "error")
      })
}
export const ProviderService = {
    getAll,
    getByIDd,
    DeleteById,
    UpdateById,
    Create
}