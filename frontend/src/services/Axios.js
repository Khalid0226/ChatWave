import axios from 'axios'

let API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

API.interceptors.response.use(
    (response)=>{
        return response
    },

    async (error) => {
        if(error.response?.status === 401 && !error.config._retry){
            error.config._retry = true

            try {
                const response = await API.post('/auth/refresh-token',
                    {},
                    {
                        withCredentials:true
                    }
                )
                return API(error.config)
            } catch (error) {
                window.location.href = '/login'   
            }
        }
        return Promise.reject(error)
    }

)

export default API