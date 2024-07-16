import { AxiosError } from 'axios'
export const errorInterceptors = (error: AxiosError) => {
    
    if (error.message === 'Netwoerk Error') {
        return Promise.reject(new Error('Erro de conexão'));
    }
    if (error.response?.status === 401)  {}

    return Promise.reject(error)
}