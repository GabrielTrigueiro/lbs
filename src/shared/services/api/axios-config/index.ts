import axios from "axios";
import { responseInterceptor } from "./interceptadores/responseInterceptor";

const api = axios.create({
    baseURL:"http://localhost:8081"
})

//atribuindo os interceptadores para a istância base "api"
api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => responseInterceptor(error),
)

export { api }