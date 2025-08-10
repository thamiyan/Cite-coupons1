import { Client, Account, Databases, Teams } from 'appwrite'

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true'

export let client, account, db, teams
export const ids = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
  users: import.meta.env.VITE_APPWRITE_USERS_COLLECTION,
  businesses: import.meta.env.VITE_APPWRITE_BUSINESSES_COLLECTION,
  coupons: import.meta.env.VITE_APPWRITE_COUPONS_COLLECTION,
  pos: import.meta.env.VITE_APPWRITE_POS_COLLECTION
}

if (!DEMO) {
  client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT)
  account = new Account(client)
  db = new Databases(client)
  teams = new Teams(client)
} else {
  client = {}
  account = {
    create: async () => ({}),
    createEmailPasswordSession: async () => ({}),
    deleteSessions: async () => ({}),
    get: async () => ({ $id: 'demoUser', name: 'Demo User', email: 'demo@cite.coupons' })
  }
  db = {}
  teams = {}
}
