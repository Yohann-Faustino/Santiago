//  Définis l'URL de base pour chaque requête HTTP:
import axios from "axios";

const AxiosCall = axios.create({
    baseURL: 'http://localhost:3000'
})

export default AxiosCall;