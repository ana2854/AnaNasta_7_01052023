/*import { getItem } from "../utils/LocalStorage"
import axios from "axios"

export const baseApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${getItem("userAuth")?.token}`,
  },
})
*/

import { getItem } from "../utils/LocalStorage"
import axios from "axios"

export const baseApi = axios.create({
  baseURL: "http://localhost:3000",
})

baseApi.interceptors.request.use(function (config) {
  const userAuth = getItem("userAuth");
  if (userAuth?.token) {
    config.headers.Authorization = `Bearer ${userAuth.token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
