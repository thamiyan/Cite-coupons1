import { useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/auth'

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true'

export default function Protected({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-10">Loading…</div>
  if (!user && !DEMO) {
    location.href = '/login?next=' + encodeURIComponent(location.pathname)
    return null
  }
  return children(user || { name: 'Demo User', email: 'demo@cite.coupons' })
}
