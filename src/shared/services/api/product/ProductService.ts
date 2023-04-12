import { AxiosError } from "axios"
import { environment } from "../../../environment";
import { api } from "../axios";
import { Notification } from "../../../components";
import { ISendPagination } from "../../../models/client";
import {
    IDataProduct,
    IDataProductRegiser,
    IProductPackage,
    IProductSearch
} from "../../../models/product";

const getAll = async (dados: ISendPagination): Promise<any | Error> => {
    const token = {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g, '')}`
        }
    }
    return await api.post<IProductSearch>(environment.url_product_search, dados, token)
        .then(data => {
            if (data instanceof AxiosError) {
                return data
            }
            return data
        })
        .catch(err => {
            console.log('aqui');
            console.error(err)
        })
}

const getByIDd = async (id: string): Promise<any | Error> => {
    const token = {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g, '')}`
        }
    }
    return await api.get(environment.url_product + `/${id}`, token)
        .then(data => {
            if (data instanceof AxiosError) {
                return data.response?.data
            }
            return data.data
        })
        .catch(err => {
            console.error(err)
        })
}

const UpdateById = async (id: string, dados: IDataProductRegiser): Promise<string | Error> => {
    const token = {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g, '')}`
        }
    }
    return await api.put<IDataProduct>(environment.url_product + `/${id}`, dados, token)
        .then(data => {
            if (data instanceof AxiosError) {
                return data.response?.data
            }
            Notification('Produto cadastrado', "success")
            return data.data
        })
        .catch(err => {
            console.error(err)
        })
}

const DeleteById = async (id: string): Promise<void | Error> => {
    const token = {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g, '')}`
        }
    }
    return await api.delete(environment.url_product + `/${id}`, token)
        .then(data => {
            if (data instanceof AxiosError) {
                return data.response?.data
            }
            Notification(data.data.message, "success");
            return data.data
        })
        .catch(err => {
            console.error(err)
        })
}

const Create = async (dados: IDataProductRegiser): Promise<any | Error> => {
    const token = {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem('Acess_Token')?.replace(/"/g, '')}`
        }
    }
    return await api.post<IProductPackage>(environment.url_product, dados, token)
        .then(data => {
            if (data instanceof AxiosError) {
                return data.response?.data
            }
            return data.data
        })
        .catch(err => {
            err.response.data.errors.map((err: any) => {
                Notification(`${err.field + " " + err.message}`, "error");
            })
        })
}

export const ProductService = {
    getAll,
    getByIDd,
    UpdateById,
    DeleteById,
    Create,
}
