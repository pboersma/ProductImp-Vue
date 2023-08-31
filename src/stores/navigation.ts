import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAuthorizationStatus, authorizeClient } from '@/services/AuthorizationService'

export const useNavigationStore = defineStore('navigation', () => {
    // Navigation Handling Store.
    const page: Ref<string> = ref('UnauthorizedPage')
    const loading: Ref<boolean> = ref(true)

    const setPage = (newPage: string) => {
        page.value = newPage
    }

    // Navigation Authorization Store.
    const isAuthorized: Ref<boolean> = ref(false)

    const authorize = async () => {
        window.location.href = await authorizeClient()
    }

    /**
     * Check Authorization on the API.
     */
    const checkAuthorization = async () => {
        // const response = await getAuthorizationStatus()
        isAuthorized.value = true

        // if (response) {
            // Default page
            page.value = 'ProductsPage'
        // }
    }

    return {
        setPage,
        page,
        checkAuthorization,
        isAuthorized,
        authorize,
        loading
    }
})
