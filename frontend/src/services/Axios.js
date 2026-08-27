import axios from 'axios'

let API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

API.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {

        const originalRequest = error.config;
        if (error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login')) {
            error.config._retry = true

            try {
                const response = await API.post('/auth/refresh-token',
                    {},
                    {
                        withCredentials: true
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