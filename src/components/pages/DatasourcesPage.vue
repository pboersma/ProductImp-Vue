<script setup lang="ts">
// @ts-nocheck
import { ref, reactive, onMounted } from 'vue'
import Swal from 'sweetalert2'

import LoadingPage from '@/components/pages/LoadingPage.vue'

// Store
import { useDatasourceStore } from '@/stores/datasource'
import { useDialogStore } from '@/stores/dialog'

const dialogStore = useDialogStore()

const datasource = useDatasourceStore()

const headers = reactive([
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Url',
    key: 'url'
  },
  {
    title: 'Auto Sync',
    key: 'autoSync'
  },
  {
    title: 'Last Sync on',
    key: 'syncDate'
  },
  {
    title: 'Updated on',
    key: 'updatedDate'
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false
  }
])

const loading = ref(true)

const sync = async (id: any) => {
  await Swal.fire({
    title: 'Do you want to sync this datasource?',
    showCancelButton: true,
    confirmButtonText: 'Yes, sync it!'
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      await datasource.sync(id)
      await Swal.fire('Synced!', '', 'success')
    }
  })
}

const deleteItem = async (id: number) => {
  await Swal.fire({
    title: 'Are you sure you want do delete this?',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await datasource.deleteItem(id)

      await Swal.fire('Deleted!', '', 'success')

      await datasource.fetchAll()
    }
  })
}

onMounted(async () => {
  await datasource.fetchAll()
  loading.value = false
})
</script>
<template>
  <div class="page-heading">
    <v-btn
      prepend-icon="mdi-plus"
      color="primary"
      @click="dialogStore.setDialog('CreateDatasource', {})"
    >
      Create
    </v-btn>
  </div>
  <v-table v-if="!loading" class="elevation-1">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key" class="text-left">{{ header.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in datasource.datasources" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.url }}</td>
        <td>
          <v-icon v-if="item.autoSync" color="green" icon="mdi-check" />
          <v-icon v-else color="red" icon="mdi-close" />
        </td>
        <td>
          <span v-if="item.syncDate">
            {{ item.syncDate }}
          </span>
          <span v-else> - </span>
        </td>
        <td>{{ item.updatedDate }}</td>
        <td>
          <v-btn
            color="primary"
            title="Synchronize"
            variant="tonal"
            class="me-3"
            size="small"
            icon="mdi-sync"
            @click="sync(item.id)"
          ></v-btn>
          <v-btn
            color="red"
            title="Synchronize"
            variant="tonal"
            class="me-3"
            size="small"
            icon="mdi-trash-can"
            @click="deleteItem(item.id)"
          ></v-btn>
        </td>
      </tr>
      <tr v-if="datasource.datasources.length === 0">
        <td style="font-weight: bold;">It looks like you don't have any datasources</td>
      </tr>
    </tbody>
  </v-table>
  <LoadingPage v-if="loading" />
</template>

<style scoped>
.page-heading {
  display: flex;
  justify-content: end;
  margin: 1rem;
}
</style>
