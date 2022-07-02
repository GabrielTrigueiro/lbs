import { AxiosError } from "axios"
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
}

export interface IInfo {
    data: IInfoClient[],
    message: string,
    errors: string,
    success: boolean
}

export type TClientTotal = {
    data: IInfo
}

const getAll = async (): Promise<TClientTotal | Error>   => {
    try {
        const {data} = await api.get('/api/client')
        if(data){
            return{
                data
            }
        }
        return new Error('Erro ao listar os registros')
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao listar os registros')
    }
}
const getByIDd = async (id: string): Promise<IInfoClient | Error>   => {
    try {
        const {data} = await api.get(`https://localhost:8081/api/client${id}`)
        if(data){
            return data
        }
        return new Error('Erro ao procurar o registro')
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao procurar o registro')
    }
}
const UpdateById = async (id: string, dados: IInfoClient): Promise<void | Error>   => {
  
    return  await api.put<IInfoClient>(`http://localhost:8081/api/client/${id}`, dados)
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
    return await api.delete(`http://localhost:8081/api/client/${id}`)
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
const Create = async (dados: IInfoClient): Promise<any>   => {

    return await api.post<IInfo>(`http://localhost:8081/api/client`, dados)
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
