<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import * as dayjs from 'dayjs'
import LoadingPage from '@/components/pages/LoadingPage.vue'

// Store
import { useProductStore } from '@/stores/product'
import { useDialogStore } from '@/stores/dialog'

const productStore = useProductStore()
const dialogStore = useDialogStore()

// Loading
const loading = ref(true)

// Pagination & Searching
const page = ref(1)
const limit = ref(10)
const query = ref('')

watch(limit, async () => {
  await refetch()
})

const search = () => {
  // Reset the page.
  page.value = 1

  refetch()
}

const refetch = async () => {
  await productStore.fetchAll(page.value, limit.value, query.value)
}

// Table
const headers = reactive([
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Last update',
    key: 'updatedDate'
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false
  }
])

onMounted(async () => {
  await refetch()
  loading.value = false
})
</script>
<template>
  <div>
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      @click:prepend-inner="search"
      @keydown.enter.prevent="search"
      v-model="query"
      variant="outlined"
      name="name"
      label="Search"
    ></v-text-field>
  </div>

  <v-table v-if="!loading" class="elevation-1 mb-5">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key" class="text-left">{{ header.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in productStore.products" :key="item.id">
        <td>
          <v-btn
            color="primary"
            title="Synchronize"
            variant="text"
            class="me-3"
            size="small"
            icon="mdi-information"
          ></v-btn
          >{{ item.name }}
        </td>
        <td><span :title="dayjs(item.updatedDate)">{{ dayjs(item.updatedDate).fromNow() }}</span></td>
        <td>
          <v-btn
            color="primary"
            title="Synchronize"
            variant="tonal"
            class="me-3"
            size="small"
            icon="mdi-sync"
          ></v-btn>
          <v-btn
            color="primary"
            title="Configure"
            variant="tonal"
            size="small"
            icon="mdi-cog"
            @click="dialogStore.setDialog('MappingDialog', item)"
          ></v-btn>
        </td>
      </tr>
      <tr v-if="productStore.products.length === 0">
        <td style="font-weight: bold">It looks like you don't have any products</td>
      </tr>
    </tbody>
  </v-table>
  <div style="display: flex">
    <v-pagination
      style="width: 80%"
      v-model="page"
      :length="Math.min(Math.ceil(productStore.total / limit), productStore.total)"
      @update:model-value="refetch"
    ></v-pagination>
    <v-select
      label="Total per page"
      v-model="limit"
      :items="[10, 20, 50, 100]"
      variant="outlined"
    ></v-select>
  </div>
  <LoadingPage v-if="loading" />
</template>
