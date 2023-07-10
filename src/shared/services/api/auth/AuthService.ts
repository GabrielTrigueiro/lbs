import { AxiosError } from "axios";
import { environment } from "../../../environment";
import { ILogin, ILoginResp } from "../../../models/user";
import { api } from "../axios";
import {Notification} from 'shared/components/notification/Notification'

//login req
const login = async (user: ILogin): Promise<any | Error> => {

    return await api.post<ILogin, ILoginResp>(environment.url_login, user)

    .then((data) => {
        if(data instanceof AxiosError){
            return data
        }
        Notification(data.message, "success")
        return data
    })
    .catch(err => Notification(err.response.data.message, "error"))
}

export const AuthService = {
    login
};