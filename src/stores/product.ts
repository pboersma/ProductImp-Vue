import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProducts } from '@/services/ProductService'

export const useProductStore = defineStore('products', () => {
    const products: any = ref({})
    const total: any = ref(1)

    const fetchAll = async (page: number, limit: number, query: string) => {
        try {
            const { data } = await getProducts(page, limit, query)

            products.value = data.items.map((item: any) => {
                return {
                    id: item.id,
                    datasource: item.configuration,
                    product: item.product,
                    name: item.product.name,
                    createdDate: item.createdDate,
                    updatedDate: item.updatedDate,
                }
            })

            total.value = data.total
        } catch(error) {
            console.error(error)
        }
    }

    return {
        products,
        total,
        fetchAll,
    }
})
