import { AxiosError } from "axios"
import { api } from "../axios-config"

export interface IInfoProvider {
    id?: string
    code: number
    name: string

    contact: number
    email: string
    telephone: number
    cell: number

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

const getAll = async (): Promise<TAllProviderList | Error>   => {
    try {
        const {data} = await api.get('/api/provider')
        if(data){
            return{
                data
            }
        }
        return new Error('Erro ao listar os registros')
    } catch (error) {
        return new Error((error as {message: string}).message || 'Erro ao carregar página.')
    }
}
const getByIDd = async (id: string): Promise<IInfoProvider | Error>   => {
    try {
        const {data} = await api.get(`https://localhost:8081/api/provider${id}`)
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
  
    return  await api.put<IInfoProvider>(`http://localhost:8081/api/provider/${id}`, dados)
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
    return await api.delete(`http://localhost:8081/api/provider/${id}`)
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

    return await api.post<IProviderPackage>(`http://localhost:8081/api/provider`, dados)
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