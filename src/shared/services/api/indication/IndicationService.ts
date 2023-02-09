import { AxiosError } from "axios"
import { api } from "../axios"
import { URL, environment } from "../../../environment"
import { dataOneIndication } from "../../../models/indication"
import { Notification } from "../../../components"

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

const createIndication = async (dados: dataOneIndication): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post(environment.url_client, dados, token)
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
    createIndication
};