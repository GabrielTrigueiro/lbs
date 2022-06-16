import { AxiosError } from "axios";

//intercepta os erros de acordo com a situação especificada
export const errorInterceptor = (error: AxiosError) => {
    
    if(error.message === 'Network Error'){
        Promise.reject(new Error('Erro de conexão'))
    }

    if(error.response?.status === 401){
        //erro de autenticação
    }

    //se não cair em nenhuma das condições
    return Promise.reject(error)
}