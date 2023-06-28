import axios from "axios"
import { getItem } from "../utils/LocalStorage";
import { removeItem } from "../utils/LocalStorage";

export const baseApi = axios.create({baseURL:"http://localhost:3000"})

//si présence d'un token : il sera inclut dans chaque en tête de chaque requêtes
const token = getItem('userAuth');
if (token) {
  baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

//si requêtes côté client après expiration du token le user est déconnecté
baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.error === 'TokenExpired') {
    
      //localstorage effacé
      removeItem('userAuth');
      //headers effacés
      axios.defaults.headers.common["Authorization"] = null;
      window.location = '/login';
    }

    // If you want to continue to reject the Promise with error object...
    return Promise.reject(error);
  }
);
