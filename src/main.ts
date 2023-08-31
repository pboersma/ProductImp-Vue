import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import dayjs from 'dayjs'
import * as RelativeTime from 'dayjs/plugin/relativeTime'
import * as Timezone from 'dayjs/plugin/timezone'
import * as utc from 'dayjs/plugin/utc'

dayjs.extend(RelativeTime)
dayjs.extend(Timezone)
dayjs.extend(utc)

dayjs.tz.setDefault('Europe/Amsterdam')
// dayjs.extend(utc)
// dayjs.extend(Timezone)
// dayjs.tz.setDefault("Europe/Amsterdam")

import App from './App.vue'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vee-Validate
import { defineRule } from 'vee-validate'
import { required, url } from '@vee-validate/rules'

defineRule('required', required)
defineRule('url', url)

const vuetify = createVuetify({
    components,
    directives,
})

import './assets/main.css'

declare global {
    interface Window {
        ProductImp: any
    }
}

// // Set Axios Defaults.
if(import.meta.env.PROD) {
//     axios.defaults.baseURL = window.ProductImp.root;
//     axios.defaults.headers.common['X-WP-Nonce'] = window.ProductImp.nonce;
} else {
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
//     axios.defaults.headers.common['Authorization'] = 'Basic cC5ib2Vyc21hQGx5Y2FuLW1lZGlhLm5sOmZ1Vmsgbm5oZyBpRWZ2IDV2RjMgVWdPTiBBVE5C'
}


const app = createApp(App)

app.use(createPinia()).use(vuetify)

app.mount('#app')
