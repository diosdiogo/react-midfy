import { CustomersData } from "../interface/ICustomers"
import Api from "./api"

type TCustomers = {
    data: CustomersData[];
    total: number;
}
const customersGetAll = async (): Promise<TCustomers | Error> => {
    try {
        const Url = 'customers'
        const response = await Api.get(Url)
        if (response) {
            return { 
                data: response.data,
                total: response.data.length
            }
        }
        return new Error('Erro ao listar os registors.')
    } catch(error) {
        return new Error((error as {message: string}).message || 'Erro ao listar os registors.')
    }
}

const createCustomer = async (customer: Omit<CustomersData, 'id'>): Promise<number | Error> => {
    try {
        const Url = 'customers'
        const response = await Api.post<CustomersData>(Url, customer)
        if (response) {
            return response.data.id
        }
        
        return new Error('Erro ao listar os registors.')
    } catch(error) {
        return new Error((error as {message: string}).message || 'Erro ao registar dados.')
    }
}
const updateCustomer = async (id: number, customer: CustomersData): Promise<void | Error> => {
    try {
        const Url = `customers/${id}`
        await Api.put<CustomersData>(Url, customer)
    } catch(error) {
        return new Error((error as {message: string}).message || 'Erro ao atualizar registors.')
    }
}
const deleteCustomer = async (id: number): Promise<void | Error> => {
    try {
        const Url = `customers/${id}`
        await Api.delete<CustomersData>(Url)
    } catch(error) {
        return new Error((error as {message: string}).message || 'Erro ao deletar registors.')
    }
}

export const CustomersService = {
    customersGetAll,
    createCustomer,
    updateCustomer,
    deleteCustomer
}
