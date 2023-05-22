import { AxiosError } from "axios";
import { environment } from "../../../environment";
import { ILogin } from "../../../models/user";
import { api } from "../axios";

//login req
const login = async (user: ILogin): Promise<any | Error> => {

    return await api.post<ILogin>(environment.url_login, user)
    .then((data) => {
        if(data instanceof AxiosError){
            return data.data
        }
        return data.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const AuthService = {
    login
};