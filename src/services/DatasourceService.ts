import type { AxiosResponse } from 'axios'
import axios from "axios";

// TODO: Move to Interface Files?
interface AxiosCustomResponse extends AxiosResponse {
    data: AxiosCustomResponseData
}

interface AxiosCustomResponseData {
    status: number
}

/**
 * Fetches all the datasources from the API.
 *
 * @returns { Promise<any> }
 */
export const getDatasources = async (): Promise<any> => {
    return await axios.get(`/api-configurations`)
        .then((response: AxiosCustomResponse) => {
            return response
        })
        .catch(error => {
            throw error
        });
}

/**
 * Delete the datasource through the API.
 *
 * @param { number } id - Resource Identifier 
 *
 * @returns { Promise<any> }
 */
export const deleteDatasource = async (id: number): Promise<any> => {
    return await axios.delete(`/api-configurations/${id}`)
    .then(( response: AxiosCustomResponse ) => {
        return response
    })
    .catch(error => {
        throw error
    })
}

/**
 * Create a new datasource through the API.
 *
 * @param { any } payload - Payload
 *
 * @returns { Promise<any> }
 */
export const createDatasource = async(payload: any): Promise<any> => {
    return await axios.post('api-configurations', payload)
    .then(( response: AxiosCustomResponse ) => {
        return response
    })
    .catch(error => {
        throw error
    })
}