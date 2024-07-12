//  Définis l'URL de base pour chaque requête HTTP:
import axios from "axios";
import { accountService } from "./account.service";

const AxiosCall = axios.create({
    baseURL: 'http://localhost:3000'
})

// Intercepteur pour récupérer le token

AxiosCall.interceptors.request.use(request => {

if(accountService.isLogged()){
    request.headers.Authorization = 'Bearer '+ accountService.getToken()
}

    return request
})

export default AxiosCall;