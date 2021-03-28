import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  rentals: [],
  rental: {},
  maintenances: [],
  maintenance: {},
  owners: [],
  owner: {},
  tenants: [],
  tenant: {}
})
