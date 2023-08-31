import axios from "axios"
import { type AxiosCustomResponse  } from "@/interfaces/axios.interfaces"
import { type DatasourceInterface } from '@/interfaces/datasource.interfaces'

/**
 * Get a list of datasources.
 *
 * @returns { Promise<AxiosCustomResponse> } The response containing the list of datasources.
 *
 * @throws { Error } If an error occurs while fetching the datasources.
 */
const getDatasources = async (): Promise<any> => {
    return await axios.get(`/api-configurations`)
        .then((response: AxiosCustomResponse) => {
            return response
        })
        .catch(error => {
            throw error
        })
}

/**
 * Delete a datasource using its ID.
 *
 * @param { number } id - The ID of the datasource to delete.
 *
 * @returns { Promise<AxiosCustomResponse> } The response from the delete request.
 *
 * @throws { Error } If an error occurs during the delete process.
 */
const deleteDatasource = async (id: number): Promise<AxiosCustomResponse> => {
    return await axios.delete(`/api-configurations/${id}`)
    .then(( response: AxiosCustomResponse ) => {
        return response
    })
    .catch(error => {
        throw error
    })
}

/**
 * Create a new datasource with the provided payload.
 *
 * @param { DatasourceInterface } payload - The data to create the datasource.
 *
 * @returns { Promise<AxiosCustomResponse> } The response from the create request.
 *
 * @throws { Error } If an error occurs during the create process.
 */
const createDatasource = async(payload: DatasourceInterface): Promise<AxiosCustomResponse> => {
    return await axios.post('api-configurations', payload)
    .then(( response: AxiosCustomResponse ) => {
        return response
    })
    .catch(error => {
        throw error
    })
}

/**
 * Synchronize a datasource using its ID.
 *
 * @param { number } id - The ID of the datasource to synchronize.
 * 
 * @returns { Promise<AxiosCustomResponse> } The response from the synchronization request.
 * 
 * @throws { Error } If an error occurs during the synchronization process.
 */
const syncDatasource = async(id: number): Promise<AxiosCustomResponse> => {
    return await axios.post(`/api-configurations/sync/${id}`)
    .then(( response: AxiosCustomResponse ) => {
        return response
    })
    .catch(error => {
        throw error
    })
}

export {
    createDatasource,
    deleteDatasource,
    syncDatasource,
    getDatasources,
}