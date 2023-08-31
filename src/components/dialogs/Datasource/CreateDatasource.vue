<script setup lang="ts">
import { reactive, ref } from 'vue'

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { useForm } from 'vee-validate'

// Store
import { useDialogStore } from '@/stores/dialog'
import { useDatasourceStore } from '@/stores/datasource'

const dialogStore = useDialogStore()
const datasourceStore = useDatasourceStore()

const errorsContainer = ref([])

const needsAuthentication = ref(false)

const schema = {
  name: 'required',
  url: 'required|url'
}

const { handleSubmit, defineInputBinds, meta } = useForm({
  validationSchema: schema
})

const form = reactive({
  name: defineInputBinds('name'),
  url: defineInputBinds('url'),
  autoSync: defineInputBinds('autoSync'),
  authentication: defineInputBinds('authentication')
})

const onSuccess = async (values: any) => {
  datasourceStore.createItem(values).then(async (response) => {
    errorsContainer.value = []

    switch (response?.status) {
      case 201:
        await dialogStore.closeDialog()
        await Swal.fire('Created!', '', 'success')
        await datasourceStore.fetchAll()
        break
      case 400:
        errorsContainer.value = response.data.message
        break
      default:
        await dialogStore.closeDialog()
        await Swal.fire('Something went wrong, Try again later..', '', 'error')
        break
    }
  })
}

const onInvalidSubmit = ({ errors }: any) => {
  errorsContainer.value = Object.values(errors)
}

const submit = handleSubmit(onSuccess, onInvalidSubmit)
</script>
<template>
  <v-dialog v-model="dialogStore.isDialogOpen" persistent width="40%">
    <form @submit.prevent="submit">
      <v-card>
        <template v-slot:title><strong>Create a new datasource</strong></template>
        <v-card-text>
          <v-alert type="info" variant="outlined" closable style="margin: 1rem 0">
            A datasource is a third-party connection to a supplier used for synchronizing new
            products to your store
          </v-alert>
          <v-alert
            v-if="errorsContainer.length > 0"
            style="margin-bottom: 1rem"
            type="error"
            title="It looks there are some issues.."
          >
            <ul style="margin-top: 0.5rem; list-style: inside !important">
              <li v-for="error in errorsContainer" :key="error">{{ error }}</li>
            </ul>
          </v-alert>
          <v-text-field
            v-bind="form.name"
            variant="outlined"
            name="name"
            label="Name"
          ></v-text-field>
          <v-text-field v-bind="form.url" variant="outlined" name="url" label="URL"></v-text-field>
          <p style="margin-bottom: 0.5rem">Options</p>
          <hr />
          <v-checkbox
            v-bind="form.autoSync"
            label="Auto synchronize"
            :hide-details="true"
          ></v-checkbox>
          <v-checkbox
            label="Needs authentication"
            @click="needsAuthentication = !needsAuthentication"
            :hide-details="true"
          ></v-checkbox>
          <v-text-field
            v-if="needsAuthentication"
            v-bind="form.authentication"
            variant="outlined"
            name="authentication"
            label="Authentication"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Save</v-btn>
          <v-btn color="primary" @click="dialogStore.closeDialog()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
