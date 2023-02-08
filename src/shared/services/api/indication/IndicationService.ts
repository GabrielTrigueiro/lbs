import { AxiosError } from "axios"
import { api } from "../axios"

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
        console.log('aqui');
        console.error(err)
    })
}

export const IndicationService = {
    getInficacoes
};