import axios from "axios";

import { errorInterceptor, reponseInterceptor } from "./interceptors"
import { Environment } from "../../../environment";


const Api = axios.create({
    baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
    (response) => reponseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };