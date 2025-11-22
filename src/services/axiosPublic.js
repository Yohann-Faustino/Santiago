// Ce service configure une instance Axios avec une URL de base SANS intercepteur pour accéder aux commentaires de la bdd sans avoir à être identifié.

import axios from "axios";

// Crée une instance d'axios pour les requêtes publiques:
const AxiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export default AxiosPublic;
