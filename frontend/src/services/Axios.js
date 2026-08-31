import axios from 'axios'

let API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // e.g., http://localhost:5000/api (Agar env me /api nahi hai toh yahan /api jod dein)
    withCredentials: true
})

API.interceptors.response.use(
    (response) => {
        return response
    },

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login') &&
            !originalRequest.url.includes('/auth/refresh-token')
        ) {
            originalRequest._retry = true;

            try {
                // Yeh /auth/refresh-token request bhegega, jobaseURL (/api) ke sath milkar 
                // http://localhost:5000/api/auth/refresh-token ban jayega jo ki bilkul sahi hai!
                await API.post('/auth/refresh-token', {}, {
                    withCredentials: true
                });
                return API(originalRequest);
            } catch (refreshError) {
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API