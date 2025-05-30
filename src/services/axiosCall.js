// Ce service configure une instance Axios avec une URL de base et un intercepteur pour ajouter automatiquement un token JWT à chaque requête si l'utilisateur est authentifié.

import axios from "axios";
import { accountService } from "./account.service";

// Crée une instance d'axios qui fait que toutes les requêtes utiliseront l'url de départ comme définis:
const AxiosCall = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// Intercepteur pour récupérer le token:
AxiosCall.interceptors.request.use(request => {
    if (accountService.isLogged()) {
        const token = accountService.getToken();
        // Montre que le token est présent ou non:
        if (process.env.NODE_ENV === "development") {
            console.log("Token récupéré :", token);
        }
        if (token) {
            request.headers.Authorization = 'Bearer ' + token;
        } else {
            if (process.env.NODE_ENV === "development") {
                console.error("❌ Token JWT non défini ou vide.");
            }
        }
    }
    return request;
});

export default AxiosCall;
