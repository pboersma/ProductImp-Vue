import type { AxiosCustomResponse } from '@/interfaces/axios.interfaces'
import axios from "axios"

export const getProducts = async (page: number = 1, limit: number = 10, query: string = ''): Promise<any> => {
    return await axios.get(`/api-products?page=${page}&limit=${limit}&query=${query}`)
        .then((response: AxiosCustomResponse) => {
            return response
        })
        .catch(error => {
            throw error
        })
}