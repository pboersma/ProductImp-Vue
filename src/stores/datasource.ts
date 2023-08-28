import { reactive, type Ref } from 'vue';
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDatasources, syncDatasource, deleteDatasource } from '@/services/DatasourceService';

export const useDatasourceStore = defineStore('datasources', () => {
    const datasources: any = ref({})

    const fetchAll = async () => {
        const response = await getDatasources()

        datasources.value = response
    }

    /**
     * Delete the datasource through the passed id
     *
     * @param { number } id - Identifier of the datasource.
     */
    const deleteItem = async (id: number) => {
        console.log(id)
        await deleteDatasource(id)
    }

    return {
        datasources,
        fetchAll,
        deleteItem
    }
})
