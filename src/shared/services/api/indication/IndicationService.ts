import { AxiosError } from "axios"
import { api } from "../axios"
import { URL, environment } from "../../../environment"
import { IIndicationSearch, registerIndication } from "../../../models/indication"
import { Notification } from "../../../components"
import { ISendPagination } from "../../../models/client"

const getInficacoes = async (): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.get(URL+"/api/indicacao", token)
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

const getAllIndicacoes = async (dados: ISendPagination): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<IIndicationSearch>(environment.url_Indicacao_search, dados, token)
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

const deletIndicacao = async (id: string): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.delete(environment.url_indication + `${id}`, token)
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

const createIndication = async (dados: registerIndication): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post(environment.url_create_indication, dados, token)
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

export const IndicationService = {
    getInficacoes,
    deletIndicacao,
    createIndication,
    getAllIndicacoes
};