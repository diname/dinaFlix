import axios from 'axios'

// Base da url: https://api.themoviedb.org/3/
// API-KEY: api_key=d98718449298e21a3e0a0a07869752bc

// URL da api: movie/now_playing

const apiUrl = 'https://api.themoviedb.org/3/'

const api = axios.create({ baseURL: apiUrl })

export default api
