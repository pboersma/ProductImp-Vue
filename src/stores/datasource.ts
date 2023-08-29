import { reactive, type Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDatasources, deleteDatasource, createDatasource } from '@/services/DatasourceService'

export const useDatasourceStore = defineStore('datasources', () => {
    const datasources: any = ref({})

    const fetchAll = async () => {
        const response = await getDatasources()

        datasources.value = response.data
    }

    /**
     * Delete the datasource through the passed id
     *
     * @param { number } id - Identifier of the datasource.
     * 
     * @returns { Promise<any> }
     */
    const deleteItem = async ( id: number ): Promise<any> => {
        await deleteDatasource(id)
    }

    /**
     * Create a new Datasource through the service.
     *
     * @param { any } payload - Payload
     * 
     * @returns { Promise<any> }
     */
    const createItem = async ( payload: any ): Promise<any> => {
        try {
            const response = await createDatasource(payload)

            return response
        } catch({ response }: any) {
            return response
        }
    }

    return {
        datasources,
        fetchAll,
        createItem,
        deleteItem
    }
})
