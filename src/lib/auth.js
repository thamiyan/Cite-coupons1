import { account } from './appwrite'

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true'
const demoUser = { $id: 'demoUser', name: 'Demo User', email: 'demo@cite.coupons' }

export async function signup({ email, password, name }) {
  if (DEMO) return demoUser
  const id = crypto.randomUUID()
  await account.create(id, email, password, name)
  await account.createEmailPasswordSession(email, password)
  return account.get()
}

export async function login({ email, password }) {
  if (DEMO) return demoUser
  await account.createEmailPasswordSession(email, password)
  return account.get()
}

export async function logout() {
  if (DEMO) return
  try { await account.deleteSessions() } catch {}
}

export function getCurrentUser() {
  if (DEMO) return Promise.resolve(demoUser)
  return account.get()
}
