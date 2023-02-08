import { AxiosError } from "axios"
import { URL, environment } from "../../../environment";
import { api } from "../axios";
import { IClientPackage, IClientSearch, IInfoClient, ISendPagination, RegisterClient } from "../../../models/client";
import { Notification } from "../../../components";

const getAll = async (dados: ISendPagination): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<IClientSearch>(environment.url_Client_search, dados, token)
    .then(data => {
        if(data instanceof AxiosError){
            return data
        }
        return data
    })
    .catch(err => {
        console.log('aqui');
        console.error(err)
    })
}

const getByIDd = async (id: string): Promise<IInfoClient | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    try {
        const {data} = await api.get( environment.url_client + `${id}`, token)
        if(data){
            return data
        }
        return new Error('Erro ao procurar o registro')
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao procurar o registro')
    }
}

const UpdateById = async (id: string, dados: IInfoClient): Promise<void | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return  await api.put<IInfoClient>(environment.url_client + `${id}`, dados, token)
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
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.delete(environment.url_client + `${id}`, token)
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

const Create = async (dados: RegisterClient): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<IClientPackage>(environment.url_client, dados, token)
    .then(data => {
        if (data instanceof AxiosError){
            return data.response?.data
        }
        return data.data
      })
      .catch(err => { 
        Notification(`${err.response.data.message}`, "error"); 
      })
}

export const ClienteService = {
    getAll,
    getByIDd,
    UpdateById,
    DeleteById,
    Create,
}
