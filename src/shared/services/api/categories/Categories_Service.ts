import { AxiosError } from "axios"
import { api } from "../axios"
import {environment } from "../../../environment"
import { Notification } from "../../../components"
import { ISendPagination } from "../../../models/client"
import { ICategoryRegister, ICategorySearch } from "../../../models/categories"

const getCategories = async (): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.get(environment.url_category, token)
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

const getAllCategories = async (dados: ISendPagination): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post<ICategorySearch>(environment.url_cateogires_search, dados, token)
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

const deletCategory = async (id: string): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.delete(environment.url_category + `/${id}`, token)
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

const createCategory= async (dados: ICategoryRegister): Promise<any | Error> => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return await api.post(environment.url_category, dados, token)
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

const UpdateById = async (id: string, dados: ICategoryRegister): Promise<void | Error>   => {
    const token = {
        headers:{
          Authorization: 
          `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g,'')}`
         }
     }
    return  await api.put<ICategoryRegister>(environment.url_category + `/${id}`, dados, token)
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

export const CategoryService = {
    createCategory,
    getCategories,
    getAllCategories,
    deletCategory,
    UpdateById
};