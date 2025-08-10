import { useState } from 'react'
import { login } from '../lib/auth'

export default function Login() {
  const [email, setEmail] = useState('demo@cite.coupons')
  const [password, setPassword] = useState('demo')
  const [err, setErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await login({ email, password })
      const url = new URL(location.href)
      const next = url.searchParams.get('next') || '/dashboard'
      location.href = next
    } catch (e) {
      setErr(e?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Connect</button>
      </form>
    </div>
  )
}
