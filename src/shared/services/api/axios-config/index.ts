import axios from "axios";
import { environment } from "../../../environment";
import { responseInterceptor } from "./interceptadores/responseInterceptor";

const api = axios.create({
    baseURL:environment.URL_BACK
})

//atribuindo os interceptadores para a istância base "api"
api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => responseInterceptor(error),
)

export { api }