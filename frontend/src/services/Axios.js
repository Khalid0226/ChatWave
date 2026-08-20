import axios from 'axios'

let API = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})

export default API